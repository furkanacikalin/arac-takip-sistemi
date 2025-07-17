require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const mongoURIUser = process.env.MONGO_URI_USERLIST;
const mongoURIVehicles = process.env.MONGO_URI_VEHICLES;

// Kullanıcılar için Mongo bağlantısı
const userConnection = mongoose.createConnection(mongoURIUser, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
userConnection.on('connected', () => console.log("MongoDB UserList veritabanına bağlandı"));
userConnection.on('error', err => console.log("UserList bağlantı hatası:", err));

// Araçlar için Mongo bağlantısı
const vehicleConnection = mongoose.createConnection(mongoURIVehicles, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
vehicleConnection.on('connected', () => console.log("MongoDB VehiclesList veritabanına bağlandı"));
vehicleConnection.on('error', err => console.log("VehiclesList bağlantı hatası:", err));

// User şeması
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String
});
const User = userConnection.model('User', userSchema);

// Vehicle şeması
const vehicleSchema = new mongoose.Schema({
  marka: String,
  model: String,
  yil: Number,
  plaka: { type: String, required: true, unique: true },
  durum: String,
  km: Number,
  vites: String,
  yakit: String,
  renk: String,
  sasi: String,
  olusturan: String
}, { collection: 'vehicles' });
const Vehicle = vehicleConnection.model('Vehicle', vehicleSchema, 'vehicles');

// Kayıt
app.post('/register', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({ message: "Eksik alan var" });

  try {
    const newUser = new User({ email, password, firstname, lastname });
    await newUser.save();
    res.json({ message: "Kayıt başarılı" });
  } catch (error) {
    res.status(400).json({ message: "Email zaten kayıtlı olabilir" });
  }
});

// Giriş
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: "Kullanıcı bulunamadı" });
  if (user.password !== password) return res.status(401).json({ message: "Şifre yanlış" });

  const token = jwt.sign(
    { id: user._id, firstname: user.firstname, lastname: user.lastname },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, firstname: user.firstname, lastname: user.lastname });
});


// Token kontrolü
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Profil bilgisi
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ firstname: req.user.firstname, lastname: req.user.lastname });
});

// Tüm araçları getir
app.get('/allvehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    console.error("Araçlar alınamadı:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Yeni araç ekle
app.post('/allvehicles', authenticateToken, async (req, res) => {
  try {
    const userFullName = req.user.firstname + " " + req.user.lastname;

    const newVehicle = {
      ...req.body,
      olusturan: userFullName  // 🔄 burada da "oluşturan" olarak eklendi
    };

    if (!newVehicle.plaka) {
      return res.status(400).json({ error: 'Plaka bilgisi zorunludur' });
    }

    const createdVehicle = await Vehicle.create(newVehicle);

    res.status(201).json({ message: 'Araç eklendi', id: createdVehicle._id });
  } catch (error) {
    console.error('Araç eklenirken hata:', error);
    res.status(500).json({ error: 'Araç eklenirken hata oluştu' });
  }
});
// Araç sorgula (plaka veya şasi numarası ile)
app.post('/search-vehicle', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Sorgu boş olamaz" });
  }

  try {
    const vehicle = await Vehicle.findOne({
      $or: [
        { plaka: query },
        { sasi: query }
      ]
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Araç bulunamadı" });
    }

    res.json(vehicle);
  } catch (error) {
    console.error("Sorgulama hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});



// Araç güncelle
app.put('/allvehicles/:plaka', async (req, res) => {
  const plaka = req.params.plaka;
  const updatedData = req.body;

  try {
    const result = await Vehicle.findOneAndUpdate(
      { plaka: plaka },
      { $set: updatedData },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Araç bulunamadı.");
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Sunucu hatası");
  }
});
app.delete('/allvehicles/:plaka', async (req, res) => {
  const plaka = req.params.plaka;

  try {
    const deleted = await Vehicle.findOneAndDelete({ plaka: plaka });

    if (!deleted) {
      return res.status(404).json({ message: "Araç bulunamadı" });
    }

    res.json({ message: "Araç başarıyla silindi" });
  } catch (err) {
    console.error("Silme hatası:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Server başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
