# 🚗 Araç Takip ve Yönetim Sistemi

Bu proje, kullanıcıların **araç bilgilerini ekleyebildiği, listeleyebildiği, güncelleyebildiği ve silebildiği** (CRUD işlemleri) bir web tabanlı araç takip sistemidir. Sisteme giriş yapmamış kullanıcılar yalnızca araçları görüntüleyebilir, ancak veri üzerinde değişiklik yapamazlar.

## 🎯 Projenin Amacı
Projedeki amacım küçük filo ve araç kiralama şirketleri için araçlarını takip edebilecekleri ve yönetebilecekleri bir site oluşturmaktı.
Kullanıcıların kayıt olarak veya giriş yaparak, kendi adları altında araç bilgilerini yönetebilecekleri bir sistem oluşturdum. Burada amaç, temel bir kullanıcı doğrulama yapısı ile birlikte MongoDB üzerinde CRUD işlemlerini gerçekleştiren tam işlevsel bir web uygulaması geliştirmektir.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji         | Açıklama                                                                      |
|-------------------|-------------------------------------------------------------------------------|
| **HTML5**         | Uygulamanın yapısal iskeletini oluşturmak için kullanıldı.                    |
| **CSS3**          | Bootstrap üzerinden stillendirme ve responsive yapı sağlandı.                 |
| **Bootstrap**     | Responsive, modern UI tasarımı için kullanıldı.                               |
| **JavaScript**    | Tüm frontend işlevselliği (form gönderimi, fetch API kullanımı) için.         |
| **Node.js**       | Backend sunucusu kurmak ve API uçları oluşturmak için kullanıldı.             |
| **Express.js**    | REST API rotalarını yönetmek için kullanıldı                                  |
| **MongoDB Atlas** | Araç ve kullanıcı verilerini barındırmak için bulut tabanlı NoSQL veritabanı. |
| **Mongoose**      | MongoDB ile daha kolay etkileşim kurmak için ODM kütüphanesi olarak.          |

---

## 🔐 Kullanıcı Yetkilendirmesi

- Giriş yapılmamış kullanıcılar yalnızca araç listesini görüntüleyebilir.
- Giriş yapan kullanıcılar:
- Yeni araç ekleyebilir.
- Kendi eklediği araçları güncelleyebilir veya silebilir.
- Her araçla birlikte **aracı ekleyen kişinin adı ve soyadı** da görüntülenir.

---

## Nasıl kullanmaya başlayabilirsiniz?

- Projeyi rar dosyası olarak indirin.
- rar dosyasının içindeki klasörü masaüstüne çıkarın.
- Terminali (cmd) açın ve backend klasörünün içine gidin.
- Terminalde "npm install" yazın.
- https://www.mongodb.com/atlas sitesine gidip MongoDB hesabınıza giriş yapın.
- Açılan Overview sayfasında yeni bir cluster oluşturmak için "create" tuşuna basın.
- Burada "free" versiyonu seçip, Cluster'ınıza isim verip (Cluster0 olabilir), AWS ve eu-west-1 olanlardan birini seçebilirsiniz.
- Ardından "create deployment" tuşuna basın.
- Yeni açılan sayfada bir ekran çıkacak; Orada username ve password bilgileri girip yanındaki "copy" tuşuna bastıktan sonra "Create Database User"'a basın.
- "Choose a connection method" tuşuna basın.
- "Connect to your application" başlığı altındaki "Drivers"'a basın.
- mongodb+srv... ile başlayan uzun linki bir yere not edin. Ardından "done" tuşuna basarak burayı kapatın.
- Sol menüden Database başlığı altındaki Clusters'a basın.
- "Browse Collections" tuşuna basın.
- Burada da "Create Database" tuşuna basın. Kullanıcı listesi için database oluşturacağız.
- Database ismini (UserList) ve collection ismini (users) girip "create" tuşuna basın.
- Tekrar "Create Database" tuşuna basın. Araç listesi için database oluşturacağız.
- Database ismini (VehiclesList) ve collection ismini (vehicles) girip "create" tuşuna basın.
- Database'lerimizi oluşturduk.
- Şimdi ise backend klasörü içine .env dosyası oluşturun. (.env.example dosyası içeriğine benzer şekilde olmalı.)
- araç-takip-sistemi klasörünü Visual Studio Code'da açarak daha rahat işlem yapabilirsiniz.
- Not aldığınız linki burada kullanacağız.
- Linkin başında kendi username ve password bilgileriniz yazmalı: mongodb+srv://**USERNAME**:**PASSWORD**@...
- Passwordu yazarken özel karakterlere dikkat edin. Özel karakterler varsa URL encoding sistemine göre düzenleyiniz.
- MONGO_URI_USERLIST linki için; "?retryWrites" yazısından önce kullanıcılar için oluşturduğunuz database'in ismini girmelisiniz: .../UserList?retryWrites...
- Ve aynı database ismini linkin sonundaki "appName=" sonrası için de güncellemelisiniz: ...appName=UserList
- Aynı link üzerinden ayrı bir düzenlemeyi de araç listesini tutan database için de yapmalısınız.
- MONGO_URI_USERLIST=mongodb+srv://**USERNAME**:**PASSWORD**@*size-özel-bilgiler*.mongodb.net/UserList?retryWrites=true&w=majority&appName=UserList
- MONGO_URI_VEHICLES=mongodb+srv://**USERNAME**:**PASSWORD**@*size-özel-bilgiler*.mongodb.net/VehiclesList?retryWrites=true&w=majority&appName=VehiclesList
- Linkler bu şekilde olmalı. size-özel-bilgiler yazdığım yerde değiştirmeniz gereken bir şey yoktur.
- Benim UserList ve VehiclesList yazdığım yerlere kendi database isimlerinizi yazmayı unutmayınız.
- JWT_SECRET şifresini istediğiniz gibi belirleyebilirsiniz. PORT=3000 olarak kalsın.
- .env dosyasında işimiz bitti. Kaydedebilirsiniz.
- Terminalde (cmd veya Visual Studio Code terminali) backend klasörü içine gidip şunu yazmalısınız: node server.js
- Bunu da yaptıktan sonra home.html dosyasını açıp siteyi kullanmaya başlayabilirsiniz.
