/*
1. buat database warehouse dan buat table dengan mengikuti syarat di bawah ini
  -  Products (product_id, product_name, category, price)
  -  Inventory (inventory_id, product_id, quantity, location)
  -  Orders (order_id, customer_id, order_date)
  -  OrderDetails (order_detail_id, order_id, product_id, quantity)
*/

db.createCollection("products");
db.createCollection("inventory");
db.createCollection("orders");
db.createCollection("orderDetails");

/*
2. Masukkan data berikut ke dalam tabel Products:
    - (1, 'Laptop', 'Elektronik', 999,99)
    - (2, 'Meja Kursi', 'Perabot', 199,99)
    - (3, 'Printer', 'Elektronik', 299,99)
    - (4, 'Rak Buku', 'Perabot', 149,99)
*/

db.products.insertMany([
  {
    product_id: 1,
    product_name: "Laptop",
    category: "Elektronik",
    price: 999.99,
  },
  {
    product_id: 2,
    product_name: "Meja kursi",
    category: "Perabot",
    price: 199.99,
  },
  {
    product_id: 3,
    product_name: "Printer",
    category: "Elektronik",
    price: 299.99,
  },
  {
    product_id: 4,
    product_name: "Rak Buku",
    category: "Perabot",
    price: 149.99,
  },
]);

/*
3. Tulis query untuk menampilkan semua produk beserta nama dan harganya, diurutkan berdasarkan harga dalam urutan menurun.
*/

db.products.find({}, { _id: 0, product_name: 1, price: 1 });

/*
4. Masukkan data berikut ke dalam tabel Inventaris:
    - (1, 1, 50, 'Gudang A')
    - (2, 2, 30, 'Gudang B')
    - (3, 3, 20, 'Gudang A')
    - (4, 4, 40, 'Gudang B')
*/

db.inventory.insertMany([
  {
    inventory_id: 1,
    product_id: 1,
    quantity: 50,
    location: "Gudang A",
  },
  {
    inventory_id: 2,
    product_id: 2,
    quantity: 30,
    location: "Gudang B",
  },
  {
    inventory_id: 3,
    product_id: 3,
    quantity: 20,
    location: "Gudang A",
  },
  {
    inventory_id: 4,
    product_id: 4,
    quantity: 40,
    location: "Gudang B",
  },
]);

/*
5. Tulis Query untuk menggabungkan tabel Produk dan Inventaris, yang menampilkan nama produk, kuantitas, dan lokasi untuk semua produk.
*/

db.inventory.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product",
    },
  },
  {
    $unwind: "$product",
  },
  {
    $project: {
      _id: 0,
      product_name: "$product.product_name",
      quantity: 1,
      location: 1,
    },
  },
]);

/*
6. Perbarui harga 'Laptop' menjadi 1099,99.
*/

db.products.updateOne({ product_name: "Laptop" }, { $set: { price: 1099.99 } });

/*
7. Tuliskan kueri untuk menghitung nilai total inventaris pada setiap gudang.
*/
db.inventory.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product",
    },
  },
  { $unwind: "$product" },

  {
    $project: {
      location: 1,
      inventory_value: {
        $multiply: ["$quantity", "$product.price"],
      },
    },
  },

  {
    $group: {
      _id: "$location",
      total_inventory_value: { $sum: "$inventory_value" },
    },
  },

  {
    $project: {
      _id: 0,
      location: "$_id",
      total_inventory_value: 1,
    },
  },
]);

/*
8. Masukkan data berikut ke dalam tabel Orders dan OrderDetails:
    1. Orders: (1, 101, '2024-08-12'), (2, 102, '2024-08-13')
    2. OrderDetails: (1, 1, 1, 2), (2, 1, 3, 1), (3, 2, 2, 1), (4, 2, 4, 2)
*/

db.order.insertMany([
  { order_id: 1, customer_id: 101, order_date: "2024-08-12" },
  { order_id: 2, customer_id: 102, order_date: "2024-08-13" },
]);

db.order_details.insertMany([
  { order_detail_id: 1, order_id: 1, product_id: 1, quantity: 2 },
  { order_detail_id: 2, order_id: 1, product_id: 3, quantity: 1 },
  { order_detail_id: 3, order_id: 2, product_id: 2, quantity: 1 },
  { order_detail_id: 4, order_id: 2, product_id: 4, quantity: 2 },
]);

/*
9. Tulis Query untuk menampilkan jumlah total untuk setiap pesanan, termasuk order_id, order_date, dan total_amount.
*/
db.order.aggregate([
  {
    $lookup: {
      from: "order_details",
      localField: "order_id",
      foreignField: "order_id",
      as: "details",
    },
  },
  { $unwind: "$details" },

  {
    $lookup: {
      from: "products",
      localField: "details.product_id",
      foreignField: "product_id",
      as: "product",
    },
  },
  { $unwind: "$product" },

  {
    $group: {
      _id: {
        order_id: "$order_id",
        order_date: "$order_date",
      },
      total_amount: {
        $sum: {
          $multiply: ["$details.quantity", "$product.price"],
        },
      },
    },
  },

  {
    $project: {
      _id: 0,
      order_id: "$_id.order_id",
      order_date: "$_id.order_date",
      total_amount: 1,
    },
  },
]);

/*
10. Tulis kueri untuk mencari produk yang belum pernah dipesan.
*/
db.products.aggregate([
  {
    $lookup: {
      from: "order_details",
      localField: "product_id",
      foreignField: "product_id",
      as: "orders",
    },
  },
  {
    $match: {
      orders: { $eq: [] },
    },
  },
  {
    $project: {
      _id: 0,
      product_id: 1,
      product_name: 1,
    },
  },
]);

/*
11. Buat tampilan yang menunjukkan tingkat stok saat ini untuk semua produk, termasuk nama_produk, jumlah, dan lokasi.
*/
db.inventory.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product",
    },
  },
  { $unwind: "$product" },

  {
    $project: {
      _id: 0,
      product_name: "$product.product_name",
      quantity: 1,
      location: 1,
    },
  },
]);
