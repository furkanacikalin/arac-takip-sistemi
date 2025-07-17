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
- cmd'yi açın ve backend klasörünün içine gidin.
- "npm install" yazınız.
- MongoDB Atlas'ta hesabınıza giriş yapıp new project'e basınız.
- Yeni proje oluşturup ardından yeni cluster oluşturunuz.
- Burada da iki adet database oluşturmanız gerekli: Kullanıcı listesi ve Araç listesi.
