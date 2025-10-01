import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Filter, Search, Star, ArrowRight, Wand2, DollarSign, X, ChevronUp } from 'lucide-react';

// Tour data
const eastAfricaTours = [
  {
    id: 'custom-trip',
    title: 'Create Your Custom Safari',
    location: 'East Africa & Beyond',
    duration: 'Flexible',
    pricePerPerson: null,
    rating: null,
    reviews: null,
    description: "Dreaming of a unique African adventure? Let our experts craft a personalized safari tailored to your interests, budget, and travel style. From specific wildlife encounters to unique cultural experiences, we'll design your perfect journey.",
    image: 'Tailor-made safari planning session with maps and notes in a cozy setting',
    tags: ['custom', 'tailor-made', 'personalized','adventure'],
    isCustom: true,
    link: 'background_Amboseli.jpeg'
  },
  {
    id: '7-Day-Kenyan-Luxury-Safari',
    title: '7-Day Kenyan Luxury Safari',
    location: 'Kenya',
    subLocation: 'Masai Mara, Amboseli, Lake Nakuru',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 2950,
    rating: 5,
    reviews: 438,
    description: "Experience Kenya's iconic national parks, from the rolling plains of Masai Mara to the elephant herds of Amboseli with Kilimanjaro's backdrop, and the flamingos of Lake Nakuru.",
    image: 'Elephants walking majestically in front of Mount Kilimanjaro Amboseli National Park Kenya',
    tags: ['kenya', 'big five', 'family', 'Luxury'],
    link: 'amboseli.jpeg'
  },
  {
    id: 'tanzania-great-migration',
    title: 'Tanzania Great Migration',
    location: 'Tanzania',
    subLocation: 'Serengeti, Ngorongoro, Tarangire',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 3500,
    rating: 5.0,
    reviews: 438,
    description: "Witness the awe-inspiring Great Wildebeest Migration in the Serengeti, explore the Ngorongoro Crater, and discover Tarangire's elephant herds.",
    image: 'Massive herd of wildebeest migrating across the Serengeti plains Tanzania',
    tags: ['tanzania', 'migration', 'wildlife', 'Luxury'],
    link: 'wildbeast.jpg'
    //https://www.safaribookings.com/day/t11621
  },
  {
    id: 'Uganda-Ultimate-Luxury-Safari',
    title: '10-Day Uganda Ultimate Luxury Safari',
    location: 'Uganda',
    subLocation: 'Bwindi, Queen Elizabeth NP',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 7200,
    rating: 4.9,
    reviews: 388,
    description: "The ultimate luxury safari package in Uganda offers adventures through top-rated parks to see the Big Five, gorillas, chimpanzees, impalas, and zebras.",
    image: 'Close-up portrait of a silverback mountain gorilla in Bwindi Impenetrable Forest Uganda',
    tags: ['uganda', 'gorillas', 'primates', 'luxury plus'],
    link: '/uganda.jpg'
    //https://www.safaribookings.com/tours/t70598
  },
  {
    id: 'rwanda-mountain-gorillas',
    title: '4-Day Rwanda Mountain Gorillas and Golden Monkeys Tour',
    location: 'Rwanda',
    subLocation: 'Volcanoes NP, Nyungwe Forest',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 2999,
    rating: 4.9,
    reviews: 538,
    description: "Discover Rwanda's stunning landscapes, trek for gorillas and golden monkeys in Volcanoes National Park, and explore Nyungwe's ancient rainforest for chimpanzees.",
    image: 'Golden monkey perched on a bamboo branch in Volcanoes National Park Rwanda',
    tags: ['rwanda', 'gorillas', 'chimpanzees', 'mid-range', 'scenic'],
    link: '/gorillaDP.jpg',
    //https://www.safaribookings.com/day/t89294
  },
  {
    id: '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli',
    title: '10-Day Ol Pejeta, Samburu, Nakuru, Mara, Amboseli',
    location: 'Kenya',
    subLocation: 'Ol Pejeta, Samburu, Nakuru, Mara, Amboseli',
    duration: '9 Days / 8 Nights',
    pricePerPerson: 3800,
    rating: 4.8,
    reviews: 185,
    description: "This luxury safari offers thrilling game drives, Big Five sightings, cultural encounters, scenic landscapes, flamingos, and unforgettable moments across Kenya",
    image: 'Rock-hewn church of St. George in Lalibela Ethiopia',
    tags: ['ethiopia', 'history', 'culture', 'mid-range', 'mountains'],
    link: '/amboseli5.webp'
    //https://www.safaribookings.com/tours/t96525
  },
  {
    id: '3-day-mara-fly-in-fly-out',
    title: '3-Day Mara Fly-in Fly-out Short and Sweet Safari',
    location: 'Kenya',
    subLocation: 'Masai Mara National Reserve',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 2999,
    rating: 4.8,
    reviews: 657,
    description: "A short and sweet luxury safari in the Masai Mara, perfect for those with limited time but wanting to experience the iconic wildlife and landscapes of Kenya.",
    image: 'Ring-tailed lemurs sitting on a tree branch in Madagascar',
    tags: ['kenya', 'luxury', 'short-stay'],
    link: '/plane3.avif'
    //https://www.safaribookings.com/tours/t72018
  },
  {
    id: 'budget-7-Day-Masai-Mara-Nakuru-Naivasha-Amboseli',
    title: '7-Day Masai Mara-Nakuru-Naivasha-Amboseli',
    location: 'Kenya',
    subLocation: 'Masai-Mara-Nakuru-Naivasha-Amboseli',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 1399,
    rating: 4.5,
    reviews: 4647,
    description: "This immersive journey offers thrilling game drives in the Masai Mara, a scenic break at Lake Nakuru, and breathtaking elephant encounters with a Kilimanjaro backdrop at Amboseli.",
    image: 'Oryx antelope standing on the crest of a red sand dune in Sossusvlei Namibia',
    tags: ['kenya', 'budget', 'wildlife', 'photography', 'scenic'],
    link: 'amboseli9.webp'
    //https://www.safaribookings.com/tours/t34504
  },
  {
    id: '6-day-serengeti-budget-safari',
    title: '6-day-Serengeti Budget Safari',
    location: 'Tanzania',
    subLocation: 'Serengeti, Ngorongoro, Lake Manyara',
    duration: '6 Days / 5 Nights',
    pricePerPerson: 1350,
    rating: 4.5,
    reviews: 92,
    description: "Travel from Arusha through Maasai plains to Tarangire, renowned for elephant herds, sweeping savannas, and diverse wildlife, before relaxing at your lodge surrounded by playful monkeys.",
    image: 'Elephants drinking from the Zambezi River in Mana Pools Zimbabwe with canoes nearby',
    tags: ['tanzania', 'budget', 'adventure', 'elephants', 'wildlife'],
    link: 'serengeti-budget2.jpg'
   // https://www.safaribookings.com/tours/t86347
  },
  {
    id: '4-day-gorilla-tracking-and-queen-elizabeth-national-park',
    title: '4-Day Gorilla Tracking and Queen Elizabeth National Park',
    location: 'Uganda',
    subLocation: 'Entebbe, Bwindi, Queen Elizabeth NP',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1925,
    rating: 4.9,
    reviews: 989,
    description: "Track mountain gorillas in Bwindi's misty forests, then discover Queen Elizabeth's savannahs and Kazinga Channel, where elephants, hippos, lions, crocodiles, and vibrant birdlife create unforgettable safari",
    image: 'Anse Source d\'Argent beach La Digue Seychelles with granite boulders and turquoise water',
    tags: ['uganda', 'gorillas', 'mid-range', 'adventure', 'wildlife'],
    link: 'gorilla1.jpg'
    //https://www.safaribookings.com/tours/t46454
  },
  {
    id: '3-day-chimpanzee-trekking-canopy-and-lake-kivu-adventure',
    title: '3-Day Chimpanzee Trekking, Canopy & Lake Kivu Adventure',
    location: 'Rwanda',
    subLocation: 'Kigali',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1469,
    rating: 4.7,
    reviews: 736,
    description: "Embark on an exhilarating canopy walk in Nyungwe National Park, suspended high above the forest floor, with sweeping views of lush treetops and the chance to spot playful primates and vibrant birdlife.",
    image: 'Lion yawning in Kruger National Park South Africa',
    tags: ['rwanda', 'adventure', 'budget', 'primates', 'nature'],
    link: 'canopy1.jpg'
    //https://www.safaribookings.com/tours/t68260
  },
  {
    id: '3-Day-samburu-flying-safari-tour',
    title: '3-Day Samburu Flying Safari Tour',
    location: 'Kenya',
    subLocation: 'Samburu',
    duration: '2 Days / 1 Nights',
    pricePerPerson: 2199,
    rating: 5,
    reviews: 1256,
    description: "Fly from Nairobi to Samburu for thrilling game drives, rare wildlife sightings, cultural encounters, and scenic river landscapes, ending with sundowners, starry nights, and a seamless return flight.",
    image: 'Pyramids of Giza with the Sphinx in the foreground Egypt',
    tags: ['kenya', 'luxury', 'flying safari', 'culture'],
    link: 'samburu1.webp'
    //https://www.safaribookings.com/tours/t74230
  },
  {
    id: '12-day-vacation-escape-to-kenya-coast',
    title: '12-Day Vacation Escape to Kenya Coast',
    location: 'Kenya',
    subLocation: 'Diani',
    duration: '12 Days / 11 Nights',
    pricePerPerson: 4500,
    rating: 4.9,
    reviews: 1652,
    description: "Experience 12 unforgettable days in Kenya's coast: Mombasa's history, Wasini dolphins, Diani's white sands, Funzi Island, Shimba Hills safari, culture, and luxury stays. Adventure, relaxation, and discovery—your ultimate tropical escape.",
    image: 'Camel caravan trekking through sand dunes in Merzouga Sahara Desert Morocco',
    tags: ['kenya', 'beach', 'mid-range', 'vacation', 'coast'],
    link: '/wasini2.webp'
  },
  {
    id: '4-day-safari-to-awe-inspiring-landscapes-of-mara-in-jeep',
    title: '4-Day Safari to Awe-Inspiring Landscapes of Mara in Jeep',
    location: 'Kenya',
    subLocation: 'Maasai Mara',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 7500,
    rating: 4.9,
    reviews: 2958,
    description: "Experience the Masai Mara like never before—luxury camps, breathtaking balloon safaris, thrilling game drives, and authentic Maasai culture await. Discover Africa's iconic wildlife in an unforgettable adventure from Nairobi.",
    image: 'Group on a walking safari in South Luangwa National Park Zambia with armed ranger',
    tags: ['kenya', 'luxury plus', 'adventure', 'wildlife', 'exclusive'],
    link: '/maasaimara14.webp'
  },
  {
    id: '10-day-kenyas-wildest-elegance-an-ultra-luxury-safari',
    title: `10-Day Kenya's Wildest Elegance - an Ultra-Luxury Safari`,
    location: 'Kenya',
    subLocation: 'Masai Mara National Reserve',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 15000,
    rating: 5,
    reviews: 1350,
    description: "Embark on a 10-day luxury safari across Meru, Samburu, Solio, and the Masai Mara—where breathtaking landscapes, rare wildlife, cultural encounters, and unforgettable adventures blend into the ultimate African escape",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['kenya', 'luxury plus', 'exclusive', 'ultra-luxury', 'premium'],
    link: '/horse1.jpg'
    //https://www.safaribookings.com/tours/t82330
  },
  {
    id: '12-day-luxury-honeymoon-safari-and-beach-holiday',
    title: '12-Day Luxury Honeymoon Safari and Beach Holiday in Tanzania',
    location: 'Tanzania',
    subLocation: 'Arusha, Serengeti, Ngorongoro, Zanzibar',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 11500,
    rating: 5,
    reviews: 3320,
    description: "Experience Tanzania's ultimate adventure—thrilling safaris in Serengeti, Tarangire, and Ngorongoro, followed by a luxurious Zanzibar beach escape. Witness wildlife, breathtaking landscapes, rich culture, and pure relaxation in one unforgettable journey.",
    image: 'Cape Coast Castle overlooking the Atlantic Ocean in Ghana',
    tags: ['tanzania', 'luxury plus', 'honeymoon', 'beach', 'romance'],
    link: '/honeymoon2.jpg'
    //https://www.safaribookings.com/day/t12833
  },
  {
    id: '3-day-luxury-safari-in-the-great-masai-mara-reserve',
    title: '3-Day Luxury Safari in the Great Masai Mara Reserve',
    location: 'Kenya',
    subLocation: 'Masai Mara National Reserve',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 3800,
    rating: 4.8,
    reviews: 3528,
    description: "Discover the magic of Masai Mara on a 3-day safari. Scenic drives, thrilling game drives, luxury stays, and cultural encounters create an unforgettable Kenyan adventure you'll cherish forever",
    image: 'Colorful pirogues (fishing boats) on the beach in Senegal',
    tags: ['kenya', 'luxury', 'safari', 'short-stay'],
    link: '/culture4.avif'
    //https://www.safaribookings.com/tours/t55346
  },
  {
    id: '8-day-unmatched-elegance-crown-jewels-of-kenya-safari',
    title: '8-Day Unmatched Elegance - Crown Jewels of Kenya Safari',
    location: 'Kenya',
    subLocation: 'Maasai Mara, Samburu National Reserve, Meru National Park',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 13000,
    rating: 5.0,
    reviews: 6540,
    description: "Embark on a breathtaking Masai Mara safari filled with scenic drives, thrilling game drives, luxury stays, and cultural encounters. Witness iconic wildlife, stunning landscapes, and create unforgettable memories on this 3-day adventure",
    image: 'Reticulated giraffe in a Laikipia conservancy Kenya with Mount Kenya in background',
    tags: ['kenya', 'luxury plus', 'exclusive', 'premium', 'conservation'],
    link: 'giraffe1.jpg'
    //https://www.safaribookings.com/tours/t82939
  },
  {
    id: '7-day-luxury-safari-kruger-national-park-south-africa',
    title: '7-Day Luxury Safari Kruger National Park South Africa',
    location: 'South Africa',
    subLocation: 'Kruger National Park',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 11245,
    rating: 5,
    reviews: 4828,
    description: "Discover South Africa's untamed wilderness in style—luxury lodges, thrilling Big Five safaris, expert guides, private plunge pools, and unforgettable encounters in Timbavati and Sabi Sands. Adventure and elegance await you.",
    image: 'Wild dogs on the hunt in Ruaha National Park Tanzania',
    tags: ['south africa', 'luxury plus', 'big five', 'premium', 'exclusive'],
    link: 'sunset3.jpg'
    //https://www.safaribookings.com/tours/t6496
  },
  {
    id: '3-day-luxury-honeymoon-safari-to-serengeti-ngorongoro',
    title: '3-Day Luxury Honeymoon Safari to Serengeti & Ngorongoro',
    location: 'Tanzania',
    subLocation: 'Serengeti, Ngorongoro Crater',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 2730,
    rating: 5,
    reviews: 5289,
    description: "Celebrate love on an unforgettable honeymoon—luxury lodges, champagne toasts, thrilling Serengeti game drives, and romantic moments in Ngorongoro Crater, surrounded by Africa's Big Five and breathtaking landscapes. Adventure and romance in one.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['tanzania', 'luxury', 'honeymoon', 'romance',],
    link: 'honeymoon6.jpg'
  },
    {
    id: '6-day-circuit-safari-masai-mara-lake-nakuru-amboseli',
    title: '6-Day Circuit Safari Masai Mara - Lake Nakuru - Amboseli',
    location: 'Kenya',
    subLocation: 'Masai Mara, Lake Nakuru, Amboseli',
    duration: '6 Days / 5 Nights',
    pricePerPerson: 1390,
    rating: 4.7,
    reviews: 16245,
    description: "Embark on a 6-day Kenya safari from Nairobi to Masai Mara, Lake Nakuru, and Amboseli. Witness the Big Five, breathtaking landscapes, and unforgettable adventures—an ultimate wildlife experience of a lifetime.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: 'lakeNakuru8.jpg'
    //https://www.safaribookings.com/day/t37941
  },
    {
    id: '4-day-masai-mara-nakuru',
    title: '4-Day Masai Mara - Nakuru ',
    location: 'Kenya',
    subLocation: 'Masai Mara, Lake Nakuru ',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1730,
    rating: 4.8,
    reviews: 3290,
    description: "Experience a 4-day Kenya safari through Masai Mara and Lake Nakuru. Spot the Big Five, flamingos, and rhinos, enjoy breathtaking landscapes, and create unforgettable memories before returning to Nairobi.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'mid-range'],
    link: 'leopard4.jpg'
    //https://www.safaribookings.com/day/t18059
  },
      {
    id: '3-day-adventure-in-masai-mara',
    title: '3-Day Adventure in Masai Mara',
    location: 'Kenya',
    subLocation: 'Masai Mara National Reserve',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 999,
    rating: 4.6,
    reviews: 7290,
    description: "Discover the wild side of Kenya on a 3-day Masai Mara safari. Spot the Big Five, witness breathtaking savannahs, enjoy game drives, and return with unforgettable memories of Africa’s most iconic reserve.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: 'lion6.jpg'
    //https://www.safaribookings.com/day/t3190
  },
  ,
  {
    id: '7-day-masai-mara-nakuru-naivasha-amboseli',
    title: '7-Day Masai Mara~Nakuru~Naivasha~Amboseli',
    location: 'Kenya',
    subLocation: 'Masai Mara National Reserve,Lake Nakuru, Lake Naivasha, Amboseli',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 1430,
    rating: 4.9,
    reviews: 4430,
    description: "Embark on a 7-day Kenya safari through Masai Mara, Lake Nakuru, Naivasha, and Amboseli. Witness the Big Five, flamingos, elephants, and Mount Kilimanjaro’s views—an unforgettable adventure across Kenya’s most iconic parks.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: 'lion8.jpg'
    //https://www.safaribookings.com/day/t34504
  },
    {
    id: '8-day-camping-safari-with-cultural-nature-experiences',
    title: '8-Day Camping Safari with Cultural & Nature Experiences',
    location: 'Tanzania',
    subLocation: 'foothill of mount kilimanjaro, Tarangire National Park, Serengeti National Park, Ngorongoro crater',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 1799,
    rating: 5,
    reviews: 3312,
    description: "Enjoy 8 days of breathtaking Tanzania—Kilimanjaro’s waterfalls, Serengeti’s endless plains, and Ngorongoro’s wildlife paradise. Experience culture, adventure, and unforgettable encounters in Africa’s most iconic landscapes",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: 'maasaimara34.jpg'
    //https://www.safaribookings.com/tours/t99292
  },
   {
    id: '3-Day-Ngorongoro-Kilimanjaro-Hike-Materuni-Waterfalls',
    title: '3-Day Ngorongoro, Kilimanjaro Hike & Materuni Waterfalls',
    location: 'Tanzania',
    subLocation: 'Ngorongoro crater,Marangu Gate, Materuni Waterfalls',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 890,
    rating: 4.8,
    reviews: 1698,
    description: "Explore Tanzania in 3 days—witness the Big Five at Ngorongoro Crater, hike Kilimanjaro’s lush rainforest, and experience Materuni Waterfalls with a traditional coffee tour. Adventure, culture, and unforgettable memories await you!",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: '/hike2.jpg'
    //https://www.safaribookings.com/day/t95227
  },
    {
    id: '5-Day-Safari-to-Selous-Nyerere-Mikumi-Maasai-Village',
    title: '5-Day Safari to Selous Nyerere, Mikumi & Maasai Village',
    location: 'Tanzania',
    subLocation: 'Dar es Salaam, Nyerere National Park, Mikumi National Park,',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 1249,
    rating: 4.9,
    reviews: 2182,
    description: "Experience Tanzania’s wild beauty in 5 days—Selous boat safari, thrilling game drives, Mikumi’s wildlife-rich plains, and authentic Maasai culture. Adventure, wildlife, and culture blend seamlessly for an unforgettable safari escape!",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: '/culture8.jpg'
  //https://www.safaribookings.com/day/t26678
  },
  {
    id: '3-Day-Murchison-Falls-NP-Ziwa-and-Budongo-Safari',
    title: '3-Day Murchison Falls NP, Ziwa, and Budongo Safari',
    location: 'Uganda',
    subLocation: 'Murchison Falls National Park, Entebbe, Budongo Forest',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1199,
    rating: 5,
    reviews: 1200,
    description: "Experience 3 unforgettable days in Uganda—track rhinos at Ziwa, witness roaring Murchison Falls, enjoy game drives and a Nile cruise, then trek chimpanzees in Budongo Forest. Wildlife, adventure, and nature at its best!",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: '/chimpanzee.jpg'
  //https://www.safaribookings.com/tours/t92117
  },
    {
    id: '5-Day-Kruger-Adventure-Safari',
    title: '5-Day Kruger Adventure Safari',
    location: 'South Africa',
    subLocation: 'Johannesburg, Kruger National Park,Hazyview town Panorama Route',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 1112,
    rating: 4.9,
    reviews: 3893,
    description: "Experience 5 unforgettable days in South Africa—thrilling Kruger safaris spotting the Big Five, breathtaking Panorama Route landscapes, and cozy lodge evenings under the stars. Adventure, wildlife, and scenery perfectly blended for your dream safari getaway!",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['kenya', 'shared tours'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/day/t42407
  },
    {
    id: '5-day-kojuu-private-explorer-tour',
    title: '5-Day Kojuu Private Explorer Tour - Premium Luxury',
    location: 'Tanzania',
    subLocation: 'Arusha,Tarangire NP,Serengeti NP,Ngorongoro Crater',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 6550,
    rating: 5,
    reviews: 3281,
    description: "Embark on a breathtaking Tanzanian safari through Tarangire, Serengeti, and Ngorongoro Crater. Witness the Big Five, endless plains, and rich wildlife while enjoying luxury lodges, expert guides, and unforgettable adventures in Africa’s wilderness.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'Luxury Plus', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t57542
  },
      {
    id: '5-day-premium-luxury-serengeti-gateway-safari',
    title: '5-Day Premium Luxury Serengeti Gateaway Safari',
    location: 'Tanzania',
    subLocation: 'Arusha,Serengeti NP,',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 6896,
    rating: 4.9,
    reviews: 2638,
    description: "Soar above Tanzania on a luxury fly-in safari to the Serengeti. Experience thrilling game drives, a breathtaking sunrise balloon ride, gourmet dining, and elegant lodges — where wilderness adventure meets unmatched comfort and exclusivity.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'Luxury Plus', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t57542
  },
    {
    id: '4-day-safari-high-end',
    title: '4-Day Safari - High-End',
    location: 'Tanzania',
    subLocation: 'Arusha,Serengeti NP,lake manyara,Ngorongoro',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 4830,
    rating: 4.9,
    reviews: 3782,
    description: "Discover Tanzania’s beauty with Lake Manyara’s diverse wildlife, the Serengeti’s endless plains, and Ngorongoro’s breathtaking crater. Experience thrilling game drives, luxury lodges, and unforgettable encounters with Africa’s most iconic animals on this extraordinary safari.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'Luxury Plus', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/day/t78569
  },
      {
    id: '5-day-tanzania-adventure-serengeti-migration-plus-big-five',
    title: '5-Day Tanzania Adventure -Serengeti Migration + Big Five',
    location: 'Tanzania',
    subLocation: 'Zanzibar,Northern Serengeti National Park,Central Serengeti National Park,lake manyara,Ngorongoro Crater,Tarangire National Park',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 3566,
    rating: 5,
    reviews: 2839,
    description: "Embark on a once-in-a-lifetime safari from Zanzibar to Serengeti, Ngorongoro, and Tarangire—witness the Great Migration, Big Five, and breathtaking landscapes while enjoying luxury camps, expert guides, and unforgettable wildlife encounters.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'Luxury', 'solo'],
    link: '/kruger3.jpg'
  //hhttps://www.safaribookings.com/day/t95089
  },
  {
    id: '4-day-luxury-tanzania-safari-tarangire-serengeti-ngorongoro',
    title: '4-Day Luxury Tanzania Safari',
    location: 'Tanzania',
    subLocation: 'Arusha,Serengeti National Park,Ngorongoro Crater,Tarangire National Park',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 2949,//1650
    rating: 4.9,
    reviews: 1489,
    description: "Discover Tanzania’s wild beauty on a 4-day safari from Arusha—explore Tarangire’s elephants, Serengeti’s endless plains, and Ngorongoro’s breathtaking crater. Luxury stays, thrilling game drives, and unforgettable wildlife moments await.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'Luxury', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t59012
  },
   {
    id: '4-day-luxury-samburu-olpejata',
    title: '4-Day Luxury Samburu NR and Ol Pejeta Conservancy',
    location: 'Kenya',
    subLocation: 'Nairobi,Ol Pejeta Conservancy,Buffalo Spring National reserve',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 2580,//1782
    rating: 4.9,
    reviews: 1865,
    description: "Embark on a 4-day Kenyan safari from Nairobi to Ol Pejeta and Samburu, where rhinos, elephants, and big cats roam. Experience unique wildlife, cultural encounters, and unforgettable landscapes in luxury comfort",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'Luxury', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t82177
  },
     {
    id: '3-day-tarangire-manyara-ngorongoro-crater',
    title: '3-Day Tarangire Manyara & Ngorongoro Crater',
    location: 'Tanzania',
    subLocation: 'Tarangire National Park,Ngorongoro Crater,Lake Manyara,Arusha',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1800,//1000
    rating: 5,
    reviews: 2358,
    description: "Experience Tanzania’s wild beauty in just 3 days—encounter elephants in Tarangire, the Big Five in Ngorongoro Crater, and tree-climbing lions in Lake Manyara, with comfort and breathtaking landscapes throughout",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'mid-range', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t87289
  },
       {
    id: '4-day-lodging-tarangire-ngorngoro-materuni',
    title: '4-Day Lodging to Tarangire, Ngorongoro & Materuni',
    location: 'Tanzania',
    subLocation: 'Tarangire National Park,Ngorongoro Crater,Materuni Waterfalls',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1999,//1097
    rating: 4.7,
    reviews: 1893,
    description: "Embark on a 4-day Tanzania adventure—immerse in Arusha’s culture, witness Tarangire’s giant elephants, marvel at Ngorongoro’s breathtaking wildlife, and hike Materuni Waterfalls. Unforgettable experiences, vibrant traditions, and scenic beauty await",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'mid-range', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/day/t86341
  },
   {
    id: '4-day-astonish-mikumi-ruaha-national-park',
    title: '4-Day Astonish Mikumi NP and Ruaha National Park',
    location: 'Tanzania',
    subLocation: 'Dar Es Salam, Mikumi National Park, Ruaha National Park,',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1449,//740
    rating: 4.8,
    reviews: 1174,
    description: "Embark on a thrilling 4-day Tanzania safari—ride the SGR to Mikumi, explore Ruaha’s vast wilderness, encounter lions, elephants, wild dogs, and rare antelopes. Remote, authentic, and unforgettable African adventure awaits.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'mid-range', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t79765
  },
     {
    id: '4-day-amboseli-tsavo-east-west',
    title: '4-Day Amboseli, Tsavo East and West Safari',
    location: 'Kenya',
    subLocation: 'Amboseli National Park,Tsavo West National Park,Tsavo east National Park',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1890,//1155
    rating: 5,
    reviews: 2383,
    description: "Embark on a 4-day Kenyan safari from Nairobi to Amboseli and Tsavo, where Kilimanjaro views, majestic elephants, legendary lions, and breathtaking landscapes create unforgettable adventures across East Africa’s most iconic parks",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'mid-range', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t73013
  },
    {
    id: '3-day-amboseli-tsavo-east-mombasa',
    title: '3-Day Amboseli -Tsavo East -Mombasa Safari',
    location: 'Kenya',
    subLocation: 'Amboseli National Park,Tsavo West National Park,Tsavo east National Park',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1149,//708
    rating: 4.8,
    reviews: 3529,
    description: "Discover Kenya’s magic on a 3-day safari from Nairobi to Amboseli and Tsavo East, then unwind in Mombasa or Diani—majestic elephants, stunning Kilimanjaro views, and a perfect beach escape await",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t27016
  },
    {
    id: '3-day-samburu-wildernes-adventure',
    title: '3-Day Samburu Wildernes Adventure',
    location: 'Kenya',
    subLocation: 'Samburu National Park',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1220,//840
    rating: 4.9,
    reviews: 2379,
    description: "Venture into Samburu’s wild beauty, where rare species, majestic elephants, and rich Samburu culture await. Experience thrilling game drives, breathtaking landscapes, and unforgettable encounters on this authentic Northern Kenya safari adventure.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t73017
  },
  {
    id: '3-day-mount-kenya-trek-sirimon-to-chogoria',
    title: '3-Day Mount Kenya Trek Sirimon to Chogoria',
    location: 'Kenya',
    subLocation: 'Nairobi, Mt Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 989,//640
    rating: 4.8,
    reviews: 1280,
    description: "Conquer Mount Kenya on an unforgettable trek! Journey through forests, moorlands, and valleys to reach Point Lenana’s sunrise summit, descending via Chogoria’s waterfalls. Adventure, breathtaking views, and memories of a lifetime await.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/day/t97133
  },
    {
    id: '3-day-the-amboseli-budget-safari',
    title: '3-Day The Amboseli Budget Safari',
    location: 'Kenya',
    subLocation: 'Nairobi, Amboseli National Park',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1111,//857
    rating: 5,
    reviews: 2139,
    description: "Discover Amboseli’s breathtaking beauty with herds of elephants set against Mount Kilimanjaro. Enjoy thrilling game drives, diverse wildlife, and unforgettable landscapes, creating a truly iconic African safari adventure",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t46091
  },
      {
    id: '3-day-tsavo-east-taita-safari-sentrim-salt-lick',
    title: '3-Day Tsavo East & Taita Safari (Sentrim & Salt Lick)',
    location: 'Kenya',
    subLocation: 'Nairobi, Tsavo National Park,Taita Hills Wildlife Sanctuary, Mombasa Beaches ',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1229,//762
    rating: 4.6,
    reviews: 3249,
    description: "Discover Tsavo’s red-earth savannahs and diverse wildlife, then experience the iconic Salt Lick Lodge. Thrilling game drives, breathtaking landscapes, and unforgettable encounters make this safari the perfect blend of adventure and comfort.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t56617
  },
   {
    id: '4-day-nairobi-amboseli-tsavo-east-mombasa-diani-watamu',
    title: '4-Day Nairobi-Amboseli-Tsavo East-Mombasa, Diani/Watamu',
    location: 'Kenya',
    subLocation: 'Nairobi, Tsavo National Park,Amboseli National Park, Mombasa Beaches ',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1299,//962
    rating: 4.8,
    reviews: 2786,
    description: "Discover Amboseli’s majestic elephants and Mount Kilimanjaro views, explore Tsavo East’s red-soil wilderness, and end your adventure on Mombasa’s sandy beaches. A perfect blend of wildlife, landscapes, and relaxation awaits you.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t10777
  },
     {
    id: '4-day-mikumi-nyerere-unforgettable-adventures',
    title: '4-Day Mikumi NP & Nyerere NP Unforgettable Adventures',
    location: 'Tanzania',
    subLocation: 'Dar Es Salaam, Mikumi National Park, Nyerere National Park',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1330,//990
    rating: 4.9,
    reviews: 3217,
    description: "Discover Tanzania’s wild side with thrilling game drives in Mikumi, a Rufiji River boat safari in Selous, and a guided walking adventure. Wildlife, landscapes, and unforgettable experiences await you.",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t61887
  },
       {
    id: '3-day-budget-safari-tarangire-ngorongoro-manyara',
    title: '3-Day Budget Safari Tarangire/Ngorongoro Crater/Manyara',
    location: 'Tanzania',
    subLocation: 'Arusha',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1249,//920
    rating: 5,
    reviews: 3893,
    description: "Embark on a breathtaking Tanzanian safari through Tarangire, Ngorongoro Crater, and Lake Manyara. Encounter elephants, lions, flamingos, and the Big Five while exploring Africa’s most iconic landscapes in comfort and style",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t88209
  },
    {
    id: '4-day-safari-to-ruaha-national-park-tanzania',
    title: '4-Day Safari to Ruaha National Park Tanzania',
    location: 'Tanzania',
    subLocation: 'Iringa,Ruaha National Park',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1056,//743
    rating: 4.5,
    reviews: 2678,
    description: "Experience Tanzania’s Ruaha National Park with thrilling game drives, walking safaris along the Great Ruaha River, and close encounters with elephants, lions, giraffes, and diverse wildlife in stunning natural landscapes",
    image: 'Murchison Falls cascading down the Nile River in Uganda',
    tags: ['Tanzania', 'budget', 'solo'],
    link: '/kruger3.jpg'
  //https://www.safaribookings.com/tours/t32589
  },
];

const Button = ({ children, className = '', onClick, variant = 'default', size = 'default', ...props }) => {
const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
  };
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-600" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />
        ))}
        <span className="text-white font-medium ml-2">{rating}</span>
      </div>
      <div className="text-gray-400 text-xs">
        ({reviews} reviews)
      </div>
    </div>
  );
};

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const categories = [
    { id: '', label: 'All Tours', color: 'bg-gray-600 hover:bg-gray-700' },
    { id: 'luxury plus', label: 'Luxury Plus', color: 'bg-purple-600 hover:bg-purple-700' },
    { id: 'luxury', label: 'Luxury', color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'mid-range', label: 'Mid-Range', color: 'bg-green-600 hover:bg-green-700' },
    { id: 'budget', label: 'Budget', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { id: 'shared tours', label: 'Shared Tours', color: 'bg-pink-600 hover:bg-pink-700' }
  ];

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleTourClick = (tourId) => {
    window.location.href = `/tours/${tourId}`;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const filteredTours = eastAfricaTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
                           tour.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const getCurrentFilterLabel = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.label : 'All Tours';
  };

  const getFilterColor = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category || selectedCategory === '') return 'bg-gradient-to-r from-orange-500 to-red-500';
    
    // Convert the category color classes to gradient equivalents
    const colorMap = {
      'bg-purple-600': 'bg-gradient-to-r from-purple-500 to-purple-600',
      'bg-blue-600': 'bg-gradient-to-r from-blue-500 to-blue-600',
      'bg-green-600': 'bg-gradient-to-r from-green-500 to-green-600',
      'bg-yellow-600': 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      'bg-pink-600': 'bg-gradient-to-r from-pink-500 to-pink-600',
      'bg-gray-600': 'bg-gradient-to-r from-gray-500 to-gray-600'
    };
    
    return colorMap[category.color] || 'bg-gradient-to-r from-orange-500 to-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <div className="pt-16 sm:pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Discover Our Safari Adventures
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From budget-friendly expeditions to ultra-luxury escapes, find your perfect African safari experience
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search tours by destination, activity, or keyword..."
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center justify-center">
              <div className="flex flex-wrap gap-4 justify-center">
                <Filter className="w-5 h-5 text-orange-400 mt-2 mr-2" />
                {categories.map(category => (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`${selectedCategory === category.id ? 
                      'bg-orange-500 hover:bg-orange-600 text-white' : 
                      `${category.color} text-white`} 
                      px-6 py-2.5 text-sm rounded-full font-semibold transition-all duration-300 transform hover:scale-105`}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Filter Status Indicator - Only show when there are active filters */}
      {(selectedCategory || searchTerm) && (
        <div className="container mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${getFilterColor()} rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/10`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between text-white">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="bg-white/20 rounded-full p-2">
                  <Filter className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Viewing: {getCurrentFilterLabel()}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} found
                    {searchTerm && <span> matching "{searchTerm}"</span>}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={clearFilters}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tours Grid */}
      <div className="container mx-auto px-4 pb-12">
        {filteredTours.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 flex flex-col min-h-[580px]"
              >
                {/* Image Container with Fixed Height */}
                <div className="relative overflow-hidden h-60 flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    alt={tour.title}
                    src={tour.link}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {tour.isCustom && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-lg animate-bounce">
                      <Wand2 className="w-3 h-3 mr-1" />
                      Tailor-Made
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 -mt-2 hover:text-orange-400 transition-colors leading-tight">
                    {tour.title}
                  </h3>
                  
                  {/* Tour Info Grid - Compact Version */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center text-lg text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                      <span className="truncate">{tour.location}</span>
                    </div>
                    <div className="flex items-center text-lg text-gray-300">
                      <Calendar className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                      <span className="truncate">{tour.duration}</span>
                    </div>
                    
                    {!tour.isCustom && tour.rating && (
                      <div className="col-span-1">
                        <StarRating rating={tour.rating} reviews={tour.reviews} />
                      </div>
                    )}
                    
                    {tour.pricePerPerson && (
                      <div className="flex items-center text-lg text-green-400 font-semibold">
                        <DollarSign className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span>${tour.pricePerPerson}/person</span>
                      </div>
                    )}
                  </div>

                  {/* Description with More Space and Increased Font Size */}
                  <div className="flex mb-4 flex-1">
                    <p className="text-gray-300 text-base leading-relaxed line-clamp-4">
                      {tour.description}
                    </p>
                  </div>

                  {/* Custom Tour Quote Message */}
                  {tour.isCustom && (
                    <div className="mb-4 animate-bounce">
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-3 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                        <p className="text-purple-200 text-sm font-medium text-center">
                          Request your personalized quote and receive a detailed proposal within 24 hours
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Button at Bottom with Consistent 16px margin */}
                  <div className="mt-auto mb-4">
                    <Button 
                      onClick={() => handleTourClick(tour.id)}
                      className={`w-full text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 ${
                        tour.isCustom ? 
                        'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' : 
                        'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                      }`}
                    >
                      {tour.isCustom ? 'Design Your Trip' : 'View Details'} 
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 mx-auto mb-6 text-gray-600"/>
              <h3 className="text-2xl font-bold text-white mb-3">No Tours Found</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Try adjusting your search terms or selecting a different category.</p>
              <Button 
                onClick={clearFilters}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Futuristic Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Main button */}
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full p-4 shadow-2xl border border-orange-400/30 backdrop-blur-sm transition-all duration-300">
              {/* Inner glow */}
              <div className="absolute inset-1 bg-gradient-to-r from-orange-300/20 to-red-400/20 rounded-full"></div>
              
              {/* Icon */}
              <ChevronUp className="w-6 h-6 text-white relative z-10 group-hover:animate-bounce" />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm">
              Back to top
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
            </div>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default ToursPage;