/**
 * Seed script — adds 20 shops and 20 jobs to the backend.
 *
 * Usage:
 *   node scripts/seedData.js <accessToken> [shops|jobs|all]
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const ACCESS_TOKEN = process.argv[2];
const TARGET = process.argv[3] || 'all';

if (!ACCESS_TOKEN) {
  console.error('❌  Please provide an access token as the first argument.');
  console.error('    node scripts/seedData.js <accessToken> [shops|jobs|all]');
  process.exit(1);
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const defaultTiming = (sat = false, sun = false) => ({
  monday:    { isOpen: true,  opensAt: "09:00", closesAt: "18:00" },
  tuesday:   { isOpen: true,  opensAt: "09:00", closesAt: "18:00" },
  wednesday: { isOpen: true,  opensAt: "09:00", closesAt: "18:00" },
  thursday:  { isOpen: true,  opensAt: "09:00", closesAt: "18:00" },
  friday:    { isOpen: true,  opensAt: "09:00", closesAt: "18:00" },
  saturday:  { isOpen: sat,   opensAt: sat ? "10:00" : "", closesAt: sat ? "17:00" : "" },
  sunday:    { isOpen: sun,   opensAt: sun ? "10:00" : "", closesAt: sun ? "17:00" : "" },
});

// ─── 20 Shops ─────────────────────────────────────────────────────────────────

const shops = [
  {
    name: "Campus Bookstore",
    type: "Bookstore",
    location: "1st Floor, Main Building",
    distance: "50m away",
    photos: ["https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800"],
    topItems: ["Textbooks", "Stationery", "Notebooks"],
    allItems: ["Textbooks", "Stationery", "Notebooks", "Pens", "Pencils", "Erasers", "Rulers", "Highlighters"],
    contactDetails: { email: "bookstore@campus.edu", phoneNo: "+1 234 567 8901" },
    shopTiming: defaultTiming(),
    offers: [{ offerName: "Back to School Sale", startDate: new Date("2026-08-01").toISOString(), endDate: new Date("2026-08-31").toISOString(), description: "20% off on all textbooks", photo: "" }],
  },
  {
    name: "Coffee Corner",
    type: "Cafe",
    location: "Ground Floor, Library Building",
    distance: "100m away",
    photos: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"],
    topItems: ["Espresso", "Cappuccino", "Croissant"],
    allItems: ["Espresso", "Cappuccino", "Latte", "Tea", "Croissant", "Sandwich", "Muffin", "Juice", "Water"],
    contactDetails: { email: "coffee@campus.edu", phoneNo: "+1 234 567 8902" },
    shopTiming: { ...defaultTiming(true, true), monday: { isOpen: true, opensAt: "07:00", closesAt: "20:00" }, tuesday: { isOpen: true, opensAt: "07:00", closesAt: "20:00" }, wednesday: { isOpen: true, opensAt: "07:00", closesAt: "20:00" }, thursday: { isOpen: true, opensAt: "07:00", closesAt: "20:00" }, friday: { isOpen: true, opensAt: "07:00", closesAt: "20:00" } },
    offers: [],
  },
  {
    name: "Tech Store",
    type: "Electronics",
    location: "2nd Floor, Student Center",
    distance: "150m away",
    photos: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"],
    topItems: ["Laptops", "Headphones", "USB Drives"],
    allItems: ["Laptops", "Headphones", "USB Drives", "Chargers", "Cables", "Mouse", "Keyboard", "Webcam", "Monitor"],
    contactDetails: { email: "tech@campus.edu", phoneNo: "+1 234 567 8903" },
    shopTiming: defaultTiming(true),
    offers: [],
  },
  {
    name: "Campus Pharmacy",
    type: "Pharmacy",
    location: "Ground Floor, Health Center",
    distance: "200m away",
    photos: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800"],
    topItems: ["Pain Relievers", "Vitamins", "First Aid"],
    allItems: ["Pain Relievers", "Vitamins", "First Aid Kit", "Cold Medicine", "Bandages", "Antiseptic", "Masks", "Gloves"],
    contactDetails: { email: "pharmacy@campus.edu", phoneNo: "+1 234 567 8904" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "The Print Shop",
    type: "Print & Copy",
    location: "Basement, Admin Building",
    distance: "80m away",
    photos: ["https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800"],
    topItems: ["Printing", "Binding", "Lamination"],
    allItems: ["Black & White Print", "Color Print", "Binding", "Lamination", "Scanning", "Photocopying", "Poster Print"],
    contactDetails: { email: "printshop@campus.edu", phoneNo: "+1 234 567 8905" },
    shopTiming: defaultTiming(),
    offers: [{ offerName: "Bulk Print Discount", startDate: new Date("2026-09-01").toISOString(), endDate: new Date("2026-12-31").toISOString(), description: "10% off on orders above 100 pages", photo: "" }],
  },
  {
    name: "Campus Gym Shop",
    type: "Sports & Fitness",
    location: "Ground Floor, Sports Complex",
    distance: "300m away",
    photos: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"],
    topItems: ["Protein Bars", "Water Bottles", "Gym Gloves"],
    allItems: ["Protein Bars", "Water Bottles", "Gym Gloves", "Resistance Bands", "Jump Rope", "Towels", "Sports Socks", "Shakers"],
    contactDetails: { email: "gymshop@campus.edu", phoneNo: "+1 234 567 8906" },
    shopTiming: { ...defaultTiming(true, true), monday: { isOpen: true, opensAt: "06:00", closesAt: "22:00" }, tuesday: { isOpen: true, opensAt: "06:00", closesAt: "22:00" }, wednesday: { isOpen: true, opensAt: "06:00", closesAt: "22:00" }, thursday: { isOpen: true, opensAt: "06:00", closesAt: "22:00" }, friday: { isOpen: true, opensAt: "06:00", closesAt: "22:00" } },
    offers: [],
  },
  {
    name: "Art Supply Store",
    type: "Art & Craft",
    location: "1st Floor, Arts Building",
    distance: "250m away",
    photos: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"],
    topItems: ["Sketchbooks", "Acrylic Paints", "Brushes"],
    allItems: ["Sketchbooks", "Acrylic Paints", "Brushes", "Canvas", "Charcoal", "Watercolors", "Markers", "Easels", "Palette"],
    contactDetails: { email: "artstore@campus.edu", phoneNo: "+1 234 567 8907" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Campus Convenience Store",
    type: "Convenience",
    location: "Ground Floor, Dormitory A",
    distance: "30m away",
    photos: ["https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800"],
    topItems: ["Snacks", "Drinks", "Instant Noodles"],
    allItems: ["Snacks", "Drinks", "Instant Noodles", "Bread", "Eggs", "Milk", "Yogurt", "Chips", "Chocolate", "Gum"],
    contactDetails: { email: "convstore@campus.edu", phoneNo: "+1 234 567 8908" },
    shopTiming: { ...defaultTiming(true, true), monday: { isOpen: true, opensAt: "07:00", closesAt: "23:00" }, tuesday: { isOpen: true, opensAt: "07:00", closesAt: "23:00" }, wednesday: { isOpen: true, opensAt: "07:00", closesAt: "23:00" }, thursday: { isOpen: true, opensAt: "07:00", closesAt: "23:00" }, friday: { isOpen: true, opensAt: "07:00", closesAt: "23:00" } },
    offers: [],
  },
  {
    name: "Campus Tailor",
    type: "Clothing & Alterations",
    location: "2nd Floor, Student Center",
    distance: "180m away",
    photos: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
    topItems: ["Uniform Stitching", "Alterations", "Embroidery"],
    allItems: ["Uniform Stitching", "Alterations", "Embroidery", "Zipper Repair", "Button Replacement", "Hemming", "Patches"],
    contactDetails: { email: "tailor@campus.edu", phoneNo: "+1 234 567 8909" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Mobile Accessories Hub",
    type: "Mobile & Accessories",
    location: "Ground Floor, Student Center",
    distance: "120m away",
    photos: ["https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800"],
    topItems: ["Phone Cases", "Screen Protectors", "Earphones"],
    allItems: ["Phone Cases", "Screen Protectors", "Earphones", "Power Banks", "Charging Cables", "Adapters", "Selfie Sticks", "Pop Sockets"],
    contactDetails: { email: "mobileacc@campus.edu", phoneNo: "+1 234 567 8910" },
    shopTiming: defaultTiming(true),
    offers: [{ offerName: "Student Discount", startDate: new Date("2026-06-01").toISOString(), endDate: new Date("2026-12-31").toISOString(), description: "15% off with valid student ID", photo: "" }],
  },
  {
    name: "Campus Florist",
    type: "Flowers & Gifts",
    location: "Main Entrance, Admin Building",
    distance: "10m away",
    photos: ["https://images.unsplash.com/photo-1487530811015-780f2f5e3f6e?w=800"],
    topItems: ["Bouquets", "Potted Plants", "Gift Boxes"],
    allItems: ["Bouquets", "Potted Plants", "Gift Boxes", "Greeting Cards", "Ribbons", "Dried Flowers", "Succulents", "Vases"],
    contactDetails: { email: "florist@campus.edu", phoneNo: "+1 234 567 8911" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Juice & Smoothie Bar",
    type: "Beverages",
    location: "Ground Floor, Sports Complex",
    distance: "280m away",
    photos: ["https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800"],
    topItems: ["Mango Smoothie", "Green Detox", "Protein Shake"],
    allItems: ["Mango Smoothie", "Green Detox", "Protein Shake", "Orange Juice", "Watermelon Juice", "Berry Blast", "Coconut Water", "Avocado Shake"],
    contactDetails: { email: "juicebar@campus.edu", phoneNo: "+1 234 567 8912" },
    shopTiming: { ...defaultTiming(true, true), monday: { isOpen: true, opensAt: "07:00", closesAt: "21:00" }, tuesday: { isOpen: true, opensAt: "07:00", closesAt: "21:00" }, wednesday: { isOpen: true, opensAt: "07:00", closesAt: "21:00" }, thursday: { isOpen: true, opensAt: "07:00", closesAt: "21:00" }, friday: { isOpen: true, opensAt: "07:00", closesAt: "21:00" } },
    offers: [],
  },
  {
    name: "Campus Barbershop",
    type: "Grooming",
    location: "Basement, Student Center",
    distance: "160m away",
    photos: ["https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800"],
    topItems: ["Haircut", "Beard Trim", "Hair Wash"],
    allItems: ["Haircut", "Beard Trim", "Hair Wash", "Styling", "Shave", "Eyebrow Trim", "Hair Color"],
    contactDetails: { email: "barber@campus.edu", phoneNo: "+1 234 567 8913" },
    shopTiming: defaultTiming(true),
    offers: [{ offerName: "First Cut Free", startDate: new Date("2026-09-01").toISOString(), endDate: new Date("2026-09-30").toISOString(), description: "Free haircut for new students in September", photo: "" }],
  },
  {
    name: "Stationery & Gift Shop",
    type: "Stationery",
    location: "1st Floor, Library Building",
    distance: "90m away",
    photos: ["https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800"],
    topItems: ["Planners", "Gift Wrap", "Greeting Cards"],
    allItems: ["Planners", "Gift Wrap", "Greeting Cards", "Sticky Notes", "Washi Tape", "Journals", "Pens", "Stamps", "Envelopes"],
    contactDetails: { email: "stationery@campus.edu", phoneNo: "+1 234 567 8914" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Campus Laundry",
    type: "Laundry Services",
    location: "Ground Floor, Dormitory B",
    distance: "220m away",
    photos: ["https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800"],
    topItems: ["Wash & Fold", "Dry Cleaning", "Ironing"],
    allItems: ["Wash & Fold", "Dry Cleaning", "Ironing", "Stain Removal", "Bulk Laundry", "Express Service", "Shoe Cleaning"],
    contactDetails: { email: "laundry@campus.edu", phoneNo: "+1 234 567 8915" },
    shopTiming: { ...defaultTiming(true, true), monday: { isOpen: true, opensAt: "08:00", closesAt: "20:00" }, tuesday: { isOpen: true, opensAt: "08:00", closesAt: "20:00" }, wednesday: { isOpen: true, opensAt: "08:00", closesAt: "20:00" }, thursday: { isOpen: true, opensAt: "08:00", closesAt: "20:00" }, friday: { isOpen: true, opensAt: "08:00", closesAt: "20:00" } },
    offers: [],
  },
  {
    name: "Campus Optician",
    type: "Optical",
    location: "1st Floor, Health Center",
    distance: "210m away",
    photos: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"],
    topItems: ["Eyeglasses", "Contact Lenses", "Sunglasses"],
    allItems: ["Eyeglasses", "Contact Lenses", "Sunglasses", "Lens Solution", "Lens Cases", "Reading Glasses", "Eye Drops", "Frames"],
    contactDetails: { email: "optician@campus.edu", phoneNo: "+1 234 567 8916" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Music & Instruments",
    type: "Music",
    location: "2nd Floor, Arts Building",
    distance: "260m away",
    photos: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800"],
    topItems: ["Guitar Strings", "Sheet Music", "Picks"],
    allItems: ["Guitar Strings", "Sheet Music", "Picks", "Capos", "Tuners", "Drumsticks", "Reeds", "Rosin", "Music Stands"],
    contactDetails: { email: "music@campus.edu", phoneNo: "+1 234 567 8917" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Campus Bakery",
    type: "Bakery",
    location: "Ground Floor, Main Building",
    distance: "40m away",
    photos: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"],
    topItems: ["Croissants", "Cakes", "Sourdough Bread"],
    allItems: ["Croissants", "Cakes", "Sourdough Bread", "Muffins", "Cookies", "Brownies", "Bagels", "Donuts", "Tarts"],
    contactDetails: { email: "bakery@campus.edu", phoneNo: "+1 234 567 8918" },
    shopTiming: { ...defaultTiming(true), monday: { isOpen: true, opensAt: "07:00", closesAt: "19:00" }, tuesday: { isOpen: true, opensAt: "07:00", closesAt: "19:00" }, wednesday: { isOpen: true, opensAt: "07:00", closesAt: "19:00" }, thursday: { isOpen: true, opensAt: "07:00", closesAt: "19:00" }, friday: { isOpen: true, opensAt: "07:00", closesAt: "19:00" } },
    offers: [{ offerName: "Morning Deal", startDate: new Date("2026-05-01").toISOString(), endDate: new Date("2026-12-31").toISOString(), description: "Buy 2 croissants get 1 free before 9am", photo: "" }],
  },
  {
    name: "Campus Travel Desk",
    type: "Travel & Ticketing",
    location: "Ground Floor, Admin Building",
    distance: "70m away",
    photos: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"],
    topItems: ["Bus Tickets", "Train Bookings", "Travel Insurance"],
    allItems: ["Bus Tickets", "Train Bookings", "Travel Insurance", "Hotel Bookings", "Flight Tickets", "Visa Assistance", "Tour Packages"],
    contactDetails: { email: "travel@campus.edu", phoneNo: "+1 234 567 8919" },
    shopTiming: defaultTiming(),
    offers: [],
  },
  {
    name: "Campus Gift Store",
    type: "Gift Store",
    location: "Main Entrance, Student Center",
    distance: "5m away",
    photos: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800"],
    topItems: ["University Hoodies", "Mugs", "Keychains"],
    allItems: ["University Hoodies", "Mugs", "Keychains", "T-Shirts", "Caps", "Tote Bags", "Pins", "Stickers", "Notebooks", "Lanyards"],
    contactDetails: { email: "giftstore@campus.edu", phoneNo: "+1 234 567 8920" },
    shopTiming: defaultTiming(true, true),
    offers: [{ offerName: "Graduation Bundle", startDate: new Date("2026-06-01").toISOString(), endDate: new Date("2026-07-31").toISOString(), description: "Special graduation gift bundles at discounted prices", photo: "" }],
  },
];

// ─── 20 Jobs ──────────────────────────────────────────────────────────────────

const jobs = [
  {
    jobName: "Campus Tour Guide",
    jobProvider: "Student Services",
    type: "part-time",
    location: "Main Campus",
    experience: 0,
    salary: { from: 14, to: 16 },
    deadline: new Date("2026-05-31").toISOString(),
    jobDescription: "Lead campus tours for prospective students and visitors. Be the face of the university.",
    responsibilities: ["Conduct guided tours", "Answer questions about campus life", "Coordinate with admissions office"],
    contactDetails: { email: "hr@campus.edu", phoneNo: "+1 234 567 8900" },
  },
  {
    jobName: "Library Assistant",
    jobProvider: "Main Library",
    type: "part-time",
    location: "Main Library",
    experience: 0,
    salary: { from: 13, to: 15 },
    deadline: new Date("2026-06-15").toISOString(),
    jobDescription: "Assist with book shelving, student inquiries, and day-to-day library operations.",
    responsibilities: ["Shelve and organize books", "Help students locate resources", "Manage check-in/check-out desk"],
    contactDetails: { email: "library@campus.edu", phoneNo: "+1 234 567 8904" },
  },
  {
    jobName: "IT Support Intern",
    jobProvider: "IT Department",
    type: "full-time",
    location: "IT Building",
    experience: 1,
    salary: { from: 17, to: 20 },
    deadline: new Date("2026-05-20").toISOString(),
    jobDescription: "Provide technical support to students and staff across campus systems.",
    responsibilities: ["Troubleshoot hardware and software issues", "Maintain IT equipment inventory", "Support network administration"],
    contactDetails: { email: "it@campus.edu", phoneNo: "+1 234 567 8905" },
  },
  {
    jobName: "Research Assistant",
    jobProvider: "Science Department",
    type: "part-time",
    location: "Science Block",
    experience: 1,
    salary: { from: 16, to: 19 },
    deadline: new Date("2026-06-01").toISOString(),
    jobDescription: "Assist faculty members with ongoing research projects, data collection, and lab experiments.",
    responsibilities: ["Collect and analyze data", "Maintain lab equipment", "Document research findings", "Assist in writing reports"],
    contactDetails: { email: "research@campus.edu", phoneNo: "+1 234 567 8921" },
  },
  {
    jobName: "Social Media Coordinator",
    jobProvider: "Marketing Department",
    type: "part-time",
    location: "Admin Building",
    experience: 0,
    salary: { from: 14, to: 17 },
    deadline: new Date("2026-05-25").toISOString(),
    jobDescription: "Manage and grow the university's social media presence across all platforms.",
    responsibilities: ["Create engaging content", "Schedule and publish posts", "Monitor analytics", "Respond to comments and messages"],
    contactDetails: { email: "marketing@campus.edu", phoneNo: "+1 234 567 8922" },
  },
  {
    jobName: "Student Counselor Assistant",
    jobProvider: "Counseling Center",
    type: "part-time",
    location: "Health Center",
    experience: 1,
    salary: { from: 15, to: 18 },
    deadline: new Date("2026-06-10").toISOString(),
    jobDescription: "Support the counseling team in organizing workshops, peer support sessions, and administrative tasks.",
    responsibilities: ["Organize wellness workshops", "Maintain appointment schedules", "Assist with peer support programs"],
    contactDetails: { email: "counseling@campus.edu", phoneNo: "+1 234 567 8923" },
  },
  {
    jobName: "Campus Security Officer",
    jobProvider: "Security Department",
    type: "full-time",
    location: "Main Campus",
    experience: 2,
    salary: { from: 18, to: 22 },
    deadline: new Date("2026-05-15").toISOString(),
    jobDescription: "Ensure the safety and security of students, staff, and campus property.",
    responsibilities: ["Patrol campus grounds", "Monitor CCTV systems", "Respond to incidents", "Enforce campus policies"],
    contactDetails: { email: "security@campus.edu", phoneNo: "+1 234 567 8924" },
  },
  {
    jobName: "Graphic Designer",
    jobProvider: "Marketing Department",
    type: "part-time",
    location: "Admin Building",
    experience: 1,
    salary: { from: 16, to: 20 },
    deadline: new Date("2026-06-20").toISOString(),
    jobDescription: "Design visual content for university events, publications, and digital platforms.",
    responsibilities: ["Design posters and banners", "Create digital assets for social media", "Collaborate with marketing team", "Maintain brand consistency"],
    contactDetails: { email: "design@campus.edu", phoneNo: "+1 234 567 8925" },
  },
  {
    jobName: "Cafeteria Staff",
    jobProvider: "Campus Dining",
    type: "part-time",
    location: "Main Cafeteria",
    experience: 0,
    salary: { from: 12, to: 14 },
    deadline: new Date("2026-05-10").toISOString(),
    jobDescription: "Assist in food preparation, serving, and maintaining cleanliness in the campus cafeteria.",
    responsibilities: ["Prepare and serve food", "Maintain hygiene standards", "Handle cash and card payments", "Restock supplies"],
    contactDetails: { email: "dining@campus.edu", phoneNo: "+1 234 567 8926" },
  },
  {
    jobName: "Event Coordinator",
    jobProvider: "Student Affairs",
    type: "part-time",
    location: "Student Center",
    experience: 1,
    salary: { from: 15, to: 18 },
    deadline: new Date("2026-06-05").toISOString(),
    jobDescription: "Plan and execute campus events including orientation, fairs, and cultural programs.",
    responsibilities: ["Plan event logistics", "Coordinate with vendors", "Manage event budgets", "Oversee event setup and breakdown"],
    contactDetails: { email: "events@campus.edu", phoneNo: "+1 234 567 8927" },
  },
  {
    jobName: "Lab Technician",
    jobProvider: "Engineering Department",
    type: "full-time",
    location: "Engineering Block",
    experience: 2,
    salary: { from: 20, to: 25 },
    deadline: new Date("2026-05-30").toISOString(),
    jobDescription: "Maintain and operate laboratory equipment for engineering students and faculty.",
    responsibilities: ["Maintain lab equipment", "Assist students during lab sessions", "Order lab supplies", "Ensure safety compliance"],
    contactDetails: { email: "englab@campus.edu", phoneNo: "+1 234 567 8928" },
  },
  {
    jobName: "Administrative Assistant",
    jobProvider: "Registrar's Office",
    type: "full-time",
    location: "Admin Building",
    experience: 1,
    salary: { from: 16, to: 19 },
    deadline: new Date("2026-06-25").toISOString(),
    jobDescription: "Provide administrative support to the registrar's office including student records management.",
    responsibilities: ["Manage student records", "Handle enrollment queries", "Process official documents", "Coordinate with departments"],
    contactDetails: { email: "registrar@campus.edu", phoneNo: "+1 234 567 8929" },
  },
  {
    jobName: "Sports Coach Assistant",
    jobProvider: "Athletics Department",
    type: "part-time",
    location: "Sports Complex",
    experience: 1,
    salary: { from: 15, to: 18 },
    deadline: new Date("2026-05-28").toISOString(),
    jobDescription: "Assist head coaches in training sessions, equipment management, and athlete performance tracking.",
    responsibilities: ["Assist in training sessions", "Manage sports equipment", "Track athlete performance", "Organize practice schedules"],
    contactDetails: { email: "athletics@campus.edu", phoneNo: "+1 234 567 8930" },
  },
  {
    jobName: "Web Developer Intern",
    jobProvider: "IT Department",
    type: "full-time",
    location: "IT Building",
    experience: 1,
    salary: { from: 18, to: 22 },
    deadline: new Date("2026-06-30").toISOString(),
    jobDescription: "Develop and maintain university web applications and internal tools.",
    responsibilities: ["Build and maintain web apps", "Fix bugs and improve performance", "Collaborate with design team", "Write clean and documented code"],
    contactDetails: { email: "webdev@campus.edu", phoneNo: "+1 234 567 8931" },
  },
  {
    jobName: "Dormitory Supervisor",
    jobProvider: "Housing Department",
    type: "full-time",
    location: "Dormitory Complex",
    experience: 2,
    salary: { from: 19, to: 23 },
    deadline: new Date("2026-05-18").toISOString(),
    jobDescription: "Oversee dormitory operations, ensure student welfare, and enforce housing policies.",
    responsibilities: ["Monitor dormitory facilities", "Address student concerns", "Enforce housing rules", "Coordinate maintenance requests"],
    contactDetails: { email: "housing@campus.edu", phoneNo: "+1 234 567 8932" },
  },
  {
    jobName: "Finance Intern",
    jobProvider: "Finance Department",
    type: "full-time",
    location: "Admin Building",
    experience: 1,
    salary: { from: 17, to: 21 },
    deadline: new Date("2026-06-12").toISOString(),
    jobDescription: "Support the finance team with budgeting, reporting, and financial data analysis.",
    responsibilities: ["Assist with budget preparation", "Analyze financial data", "Prepare reports", "Support audits and reconciliations"],
    contactDetails: { email: "finance@campus.edu", phoneNo: "+1 234 567 8933" },
  },
  {
    jobName: "Photography & Media Intern",
    jobProvider: "Communications Office",
    type: "part-time",
    location: "Main Campus",
    experience: 0,
    salary: { from: 14, to: 17 },
    deadline: new Date("2026-06-08").toISOString(),
    jobDescription: "Capture photos and videos of campus events and activities for university communications.",
    responsibilities: ["Photograph campus events", "Edit photos and videos", "Manage media archive", "Support communications team"],
    contactDetails: { email: "media@campus.edu", phoneNo: "+1 234 567 8934" },
  },
  {
    jobName: "Peer Tutor",
    jobProvider: "Academic Support Center",
    type: "part-time",
    location: "Library Building",
    experience: 0,
    salary: { from: 13, to: 16 },
    deadline: new Date("2026-05-22").toISOString(),
    jobDescription: "Provide academic tutoring to fellow students in subjects such as math, science, and writing.",
    responsibilities: ["Conduct one-on-one tutoring sessions", "Help students with assignments", "Track student progress", "Attend tutor training sessions"],
    contactDetails: { email: "tutoring@campus.edu", phoneNo: "+1 234 567 8935" },
  },
  {
    jobName: "Sustainability Coordinator",
    jobProvider: "Facilities Management",
    type: "part-time",
    location: "Main Campus",
    experience: 1,
    salary: { from: 15, to: 18 },
    deadline: new Date("2026-06-18").toISOString(),
    jobDescription: "Promote and implement sustainability initiatives across campus.",
    responsibilities: ["Organize recycling programs", "Conduct sustainability audits", "Raise awareness through campaigns", "Coordinate with facilities team"],
    contactDetails: { email: "sustainability@campus.edu", phoneNo: "+1 234 567 8936" },
  },
  {
    jobName: "International Student Advisor",
    jobProvider: "International Office",
    type: "full-time",
    location: "Admin Building",
    experience: 2,
    salary: { from: 20, to: 25 },
    deadline: new Date("2026-06-28").toISOString(),
    jobDescription: "Advise and support international students with visa, accommodation, and academic integration.",
    responsibilities: ["Assist with visa and immigration queries", "Organize orientation for international students", "Provide academic and cultural support", "Liaise with embassies and consulates"],
    contactDetails: { email: "international@campus.edu", phoneNo: "+1 234 567 8937" },
  },
];

// ─── Seeder functions ─────────────────────────────────────────────────────────

async function seedShops() {
  console.log('\n🏪  Seeding shops...\n');
  for (const shop of shops) {
    try {
      await api.post('/shops', shop);
      console.log(`  ✅  ${shop.name}`);
    } catch (err) {
      console.error(`  ❌  ${shop.name}: ${err.response?.data?.message || err.message}`);
    }
  }
}

async function seedJobs() {
  console.log('\n💼  Seeding jobs...\n');
  for (const job of jobs) {
    try {
      await api.post('/jobs', job);
      console.log(`  ✅  ${job.jobName}`);
    } catch (err) {
      console.error(`  ❌  ${job.jobName}: ${err.response?.data?.message || err.message}`);
    }
  }
}

async function main() {
  console.log(`\n🚀  Seeding to ${BASE_URL}  (target: ${TARGET})\n`);
  if (TARGET === 'all' || TARGET === 'shops') await seedShops();
  if (TARGET === 'all' || TARGET === 'jobs')  await seedJobs();
  console.log('\n✨  Done!\n');
}

main().catch((err) => {
  console.error('💥  Unexpected error:', err.message);
  process.exit(1);
});
