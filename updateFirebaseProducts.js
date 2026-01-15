// Script to update Firebase with PC component products
// Run this with: node updateFirebaseProducts.js

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, writeBatch, doc, getDocs, deleteDoc } = require('firebase/firestore');

// Firebase configuration - loaded from .env file
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// PC Component products - 8 categories, 5 items each
const products = [
  // CPU Category
  {
    name: "Intel Core i9-14900K",
    description: "24-core (8P+16E) processor with up to 6.0 GHz boost",
    price: 589.99,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500",
    stock: 25,
    featured: true
  },
  {
    name: "AMD Ryzen 9 7950X",
    description: "16-core, 32-thread processor with 5.7 GHz boost",
    price: 549.99,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500",
    stock: 30,
    featured: true
  },
  {
    name: "Intel Core i7-14700K",
    description: "20-core processor with excellent gaming performance",
    price: 409.99,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500",
    stock: 40,
    featured: false
  },
  {
    name: "AMD Ryzen 7 7800X3D",
    description: "8-core gaming CPU with 3D V-Cache technology",
    price: 449.99,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500",
    stock: 35,
    featured: true
  },
  {
    name: "Intel Core i5-14600K",
    description: "14-core processor perfect for gaming and productivity",
    price: 319.99,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500",
    stock: 50,
    featured: false
  },

  // GPU Category
  {
    name: "NVIDIA RTX 4090",
    description: "Flagship GPU with 24GB GDDR6X for 4K gaming",
    price: 1599.99,
    category: "GPU",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
    stock: 15,
    featured: true
  },
  {
    name: "AMD Radeon RX 7900 XTX",
    description: "High-performance 24GB graphics card for gaming",
    price: 999.99,
    category: "GPU",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
    stock: 20,
    featured: true
  },
  {
    name: "NVIDIA RTX 4080",
    description: "16GB GDDR6X graphics card for enthusiast gaming",
    price: 1199.99,
    category: "GPU",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
    stock: 22,
    featured: true
  },
  {
    name: "NVIDIA RTX 4070 Ti",
    description: "12GB graphics card with excellent 1440p performance",
    price: 799.99,
    category: "GPU",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
    stock: 28,
    featured: false
  },
  {
    name: "AMD Radeon RX 7800 XT",
    description: "16GB VRAM for high-end 1440p gaming",
    price: 499.99,
    category: "GPU",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
    stock: 32,
    featured: false
  },

  // Cooling Category
  {
    name: "Corsair iCUE H150i Elite",
    description: "360mm RGB liquid CPU cooler with LCD display",
    price: 189.99,
    category: "Cooling",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    stock: 45,
    featured: true
  },
  {
    name: "Noctua NH-D15",
    description: "Premium dual-tower air cooler with silent operation",
    price: 109.99,
    category: "Cooling",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    stock: 60,
    featured: true
  },
  {
    name: "NZXT Kraken X63",
    description: "280mm AIO liquid cooler with RGB lighting",
    price: 149.99,
    category: "Cooling",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    stock: 50,
    featured: false
  },
  {
    name: "be quiet! Dark Rock Pro 4",
    description: "High-performance air cooler with quiet operation",
    price: 89.99,
    category: "Cooling",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    stock: 55,
    featured: false
  },
  {
    name: "Arctic Liquid Freezer II 240",
    description: "240mm AIO with excellent cooling performance",
    price: 79.99,
    category: "Cooling",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    stock: 70,
    featured: false
  },

  // RAM Category
  {
    name: "Corsair Dominator Platinum RGB 32GB",
    description: "DDR5-6000 MHz (2x16GB) high-performance RAM",
    price: 179.99,
    category: "RAM",
    image: "https://images.unsplash.com/photo-1541006008768-d5f2b880e9e3?w=500",
    stock: 80,
    featured: true
  },
  {
    name: "G.SKILL Trident Z5 RGB 32GB",
    description: "DDR5-6400 MHz (2x16GB) for gaming and content creation",
    price: 159.99,
    category: "RAM",
    image: "https://images.unsplash.com/photo-1541006008768-d5f2b880e9e3?w=500",
    stock: 90,
    featured: false
  },
  {
    name: "Kingston Fury Beast 32GB",
    description: "DDR5-5600 MHz (2x16GB) reliable performance",
    price: 129.99,
    category: "RAM",
    image: "https://images.unsplash.com/photo-1541006008768-d5f2b880e9e3?w=500",
    stock: 100,
    featured: false
  },
  {
    name: "Corsair Vengeance RGB 64GB",
    description: "DDR5-5600 MHz (2x32GB) for heavy workloads",
    price: 249.99,
    category: "RAM",
    image: "https://images.unsplash.com/photo-1541006008768-d5f2b880e9e3?w=500",
    stock: 65,
    featured: true
  },
  {
    name: "G.SKILL Ripjaws S5 32GB",
    description: "DDR5-6000 MHz (2x16GB) value performance",
    price: 139.99,
    category: "RAM",
    image: "https://images.unsplash.com/photo-1541006008768-d5f2b880e9e3?w=500",
    stock: 85,
    featured: false
  },

  // Storage Category
  {
    name: "Samsung 990 Pro 2TB",
    description: "NVMe Gen 4 SSD with 7450 MB/s read speed",
    price: 189.99,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    stock: 55,
    featured: true
  },
  {
    name: "WD Black SN850X 2TB",
    description: "PCIe Gen 4 NVMe SSD for gaming and content creation",
    price: 179.99,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    stock: 60,
    featured: true
  },
  {
    name: "Crucial P5 Plus 1TB",
    description: "Fast PCIe Gen 4 NVMe M.2 SSD",
    price: 89.99,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    stock: 75,
    featured: false
  },
  {
    name: "Samsung 870 EVO 2TB",
    description: "2.5-inch SATA SSD with reliable performance",
    price: 149.99,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    stock: 70,
    featured: false
  },
  {
    name: "Seagate FireCuda 530 1TB",
    description: "High-speed Gen 4 NVMe for gaming",
    price: 119.99,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    stock: 65,
    featured: false
  },

  // Case Category
  {
    name: "Lian Li O11 Dynamic EVO",
    description: "Mid-tower case with excellent airflow and RGB",
    price: 159.99,
    category: "Case",
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500",
    stock: 35,
    featured: true
  },
  {
    name: "Corsair 4000D Airflow",
    description: "High-airflow mid-tower ATX case",
    price: 104.99,
    category: "Case",
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500",
    stock: 50,
    featured: false
  },
  {
    name: "NZXT H7 Flow",
    description: "Modern mid-tower with cable management",
    price: 129.99,
    category: "Case",
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500",
    stock: 40,
    featured: true
  },
  {
    name: "Fractal Design Torrent",
    description: "High-airflow case with massive fans",
    price: 189.99,
    category: "Case",
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500",
    stock: 30,
    featured: false
  },
  {
    name: "be quiet! Pure Base 500DX",
    description: "Silent mid-tower with RGB front panel",
    price: 109.99,
    category: "Case",
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500",
    stock: 45,
    featured: false
  },

  // Motherboard Category
  {
    name: "ASUS ROG Maximus Z790 Hero",
    description: "Premium Intel Z790 ATX motherboard with WiFi 7",
    price: 629.99,
    category: "Motherboard",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
    stock: 20,
    featured: true
  },
  {
    name: "MSI MPG X670E Carbon WiFi",
    description: "AMD X670E ATX board with PCIe 5.0 support",
    price: 419.99,
    category: "Motherboard",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
    stock: 25,
    featured: true
  },
  {
    name: "Gigabyte Z790 AORUS Elite AX",
    description: "Feature-rich Z790 motherboard with DDR5",
    price: 289.99,
    category: "Motherboard",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
    stock: 35,
    featured: false
  },
  {
    name: "ASUS TUF Gaming B650-Plus WiFi",
    description: "Reliable AMD B650 ATX board for gaming",
    price: 219.99,
    category: "Motherboard",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
    stock: 40,
    featured: false
  },
  {
    name: "MSI MAG B760 Tomahawk WiFi",
    description: "Intel B760 ATX motherboard with solid features",
    price: 199.99,
    category: "Motherboard",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
    stock: 45,
    featured: false
  },

  // Power Supply Category
  {
    name: "Corsair RM1000x",
    description: "1000W 80+ Gold fully modular PSU",
    price: 189.99,
    category: "Power Supply",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 40,
    featured: true
  },
  {
    name: "EVGA SuperNOVA 850 G7",
    description: "850W 80+ Gold modular power supply",
    price: 149.99,
    category: "Power Supply",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 50,
    featured: false
  },
  {
    name: "Seasonic FOCUS GX-850",
    description: "850W 80+ Gold reliable PSU with 10-year warranty",
    price: 139.99,
    category: "Power Supply",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 55,
    featured: true
  },
  {
    name: "be quiet! Straight Power 11 750W",
    description: "750W 80+ Platinum quiet modular PSU",
    price: 159.99,
    category: "Power Supply",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 45,
    featured: false
  },
  {
    name: "Thermaltake Toughpower GF3 850W",
    description: "850W 80+ Gold ATX 3.0 ready PSU",
    price: 129.99,
    category: "Power Supply",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 60,
    featured: false
  }
];

// Main function to update the database
async function updateDatabase() {
  try {
    console.log('Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Step 1: Delete all existing products
    console.log('Deleting existing products...');
    const querySnapshot = await getDocs(collection(db, 'products'));
    const deletePromises = [];
    
    querySnapshot.forEach((docSnapshot) => {
      deletePromises.push(deleteDoc(docSnapshot.ref));
    });
    
    await Promise.all(deletePromises);
    console.log(`✓ Deleted ${deletePromises.length} old products`);
    
    // Step 2: Add new products
    console.log(`Adding ${products.length} new PC component products...`);
    
    const batch = writeBatch(db);
    
    products.forEach((product) => {
      const docRef = doc(collection(db, 'products'));
      batch.set(docRef, product);
    });
    
    await batch.commit();
    
    console.log('✅ SUCCESS! Database updated with PC components!');
    console.log(`   - 8 categories: CPU, GPU, Cooling, RAM, Storage, Case, Motherboard, Power Supply`);
    console.log(`   - 5 items per category = 40 total products`);
    process.exit(0);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the update function
updateDatabase();
