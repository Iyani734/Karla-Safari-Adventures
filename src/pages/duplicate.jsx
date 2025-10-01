import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom'; 
import { MapPin, Calendar, Users, ArrowRight, ArrowLeft, Clock, Star, Send, DollarSign, Briefcase, Sun, Moon, CloudDrizzle, CloudSnow, Search, Wand2, Home, Settings, UserCheck, Baby, CalendarCheck, Globe, Binary as Binoculars, Truck, Plane, Bed, Utensils, Info, ExternalLink, CheckCircle, XCircle, MapIcon, Quote, ThumbsUp, Camera, Compass, Heart, Award, TrendingUp, MessageCircle, Users as UsersIcon, Shield, TreePine, Leaf, Wind, Mountain, Sunrise, BookOpen, AlertTriangle, Sparkles, Crown, Gift, Zap, Cat, Dog, Bird, Fish, Rabbit, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import ImagePopup from '../components/ImagePopup';

// ========================================
// CENTRALIZED IMAGE MANAGEMENT SYSTEM
// ========================================
// All images for the entire application are managed here
// To change any image, simply update the URL in the appropriate section below

const IMAGE_MANAGER = {
  // ========================================
  // TOUR THUMBNAILS - Main card images for tour listings and related tours
  // ========================================
  // These are the primary thumbnail images displayed on tour cards
  // Used in: tour listings, "You might also like" sections, related tours
  tourThumbnails: {
    'custom-trip': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
    '7-Day-Kenyan-Luxury-Safari': '',
    'tanzania-great-migration': 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop',
    'zambia-walking-safari': 'https://images.unsplash.com/photo-1553009175-a94e8d87a834?w=600&h=400&fit=crop',
    'botswana-delta-chobe': 'https://images.unsplash.com/photo-1551449892-3ef6e69e3592?w=600&h=400&fit=crop',
    'uganda-gorilla-trek': 'https://images.unsplash.com/photo-1572541164741-8549de64f0b6?w=600&h=400&fit=crop',
    'rwanda-primates-volcanoes': 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=600&h=400&fit=crop',
    'namibia-desert-wildlife': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'
  },

  // Main tour hero images - displayed on tour detail page header
  tourHeroImages: {
    'custom-trip': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
    '7-Day-Kenyan-Luxury-Safari': '/Elephants_luxury.jpg',
    'tanzania-great-migration': '/wildbeast.jpg',
    'Uganda-Ultimate-Luxury-Safari': '/byeuganda.jpg', 
    'rwanda-mountain-gorillas': '/gorillaDP2.jpg',
    '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli': '/amboseli5.webp',
  },

  // Daily itinerary images - for each day of each tour
  dailyItineraryImages: {
    'custom-trip': {
      1: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=400&fit=crop',
      2: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop',
      3: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop',
      4: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop'
    },
    '7-Day-Kenyan-Luxury-Safari': {
      1: '/elephants_amboseli2.jpg',
      2: '/elephants_amboseli.jpg',
      3: '/lake naivasha.jpg',
      4: '/Lake Nakuru.jpg',
      5: '/maasai mara.avif',
      6: '/maasai mara2.jpg',
      7: '/zebra.jpg'
    },
    'tanzania-great-migration': {
      1: '/manyara2.jpg',
      2: '/ngorongoro.jpg',
      3: '/serengeti.jpg',
      4: '/serengeti2.jpg',
      '5-6': '/serengeti3.jpg',
      7: '/planeSerengeti.jpg',

    },
    'Uganda-Ultimate-Luxury-Safari': {
      1: '/murchison falls.webp',
      2: '/murchison falls2.jpg',
      3: '/kibale national.jpg',
      4: '/bigodi community.webp',
      5: '/queenelizabeth.jpg',
      6: '/queenelizabeth2.jpg',
      7: '/bwindi.jpg',
      8: '/bwindi2.jpg',
      9: '/mburo.jpg',
      10: '/backHome1.webp'
    },
    'rwanda-mountain-gorillas': {
      1: '/kigalitour.jpg',
      2: '/volcanoeGorilla.jpg',
      3: '/goldenMonkeys.webp',
      4: '/equator.jpg',
    },
    '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli': {
      1: "/olPejeta1.jpg",
      2: "/samburuNational1.jpg",
      3: "/samburuNational2.jpg",
      4: "/LakeNakuru1.jpg",
      5: "/maasaiMara1.jpg",
      6: "/maasaiMara2.jpg",
      7: "/lakeNakuru2.jpg",
      8: "/amboseli1.jpg",
      9: "/amboseli2.webp",
      10: "/amboseli3.jpg",
      
  },

  // Suggested tour images - displayed in "You might also like" section
  // DEPRECATED: Use tourThumbnails instead for consistency
  suggestedTourImages: {
    'custom-trip': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
    '7-Day-Kenyan-Luxury-Safari': 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop',
    'tanzania-great-migration': 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop',
    'zambia-walking-safari': 'https://images.unsplash.com/photo-1553009175-a94e8d87a834?w=600&h=400&fit=crop',
    'botswana-delta-chobe': 'https://images.unsplash.com/photo-1551449892-3ef6e69e3592?w=600&h=400&fit=crop'
  },

  // Vehicle images - used in vehicle popup when clicked
  vehicleImages: [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop',
  ]
}
};

// ========================================
// CENTRALIZED ACCOMMODATION MANAGEMENT SYSTEM
// ========================================
// All accommodations for the entire application are managed here
// To add a new hotel, simply add it to the hotels object with all its details
// To assign a hotel to a specific day, add it to the tourAccommodations mapping

const ACCOMMODATION_MANAGER = {
  // ========================================
  // HOTEL DEFINITIONS
  // ========================================
  // All hotel data including name, description, meals, website, and images
  // To add a new hotel, simply add it here with a unique ID
  hotels: {
    'ol-tukai-lodge': {
      name: 'Ol Tukai Lodge',
      description: 'Luxury lodge inside Amboseli NP',
      meals: 'All Meals Included',
      website: 'https://oltukailodge.com/',
      images: [
        '/oltukai3.jpg',
        '/oltukai1.jpg',
        '/oltukai4.jpg',
        '/oltukai2.jpg',
        '/oltukai5.jpg',
        '/oltukai6.jpg'
      ]
    },
    'lake-naivasha-sopa-resort': {
      name: 'Lake Naivasha Sopa Resort',
      description: 'Mid-range hotel at Lake Naivasha',
      meals: 'Lunch & Dinner Included',
      website: 'https://www.lakenaivasha-soparesort.com/',
      images: [
        '/sopa 12.webp',
        '/sopa 15.webp',
        '/sopa 13.webp',
        '/sopa 11.webp',
        '/sopa 17.webp',
        '/sopa 16.webp'
      ]
    },
    'sarova-lion-hill-game-lodge': {
      name: 'Sarova Lion Hill Game Lodge',
      description: 'Luxury lodge inside Lake Nakuru NP',
      meals: 'Lunch & Dinner Included',
      website: 'https://sarovahotels.com',
      images: [
        '/sarova1.jpg',
        '/sarova2.jpg',
        '/sarova3.jpg',
        '/sarova7.jpg',
        '/sarova5.jpg',
        '/sarova6.jpg'
      ]
    },
    'sarova-mara-game-camp': {
      name: 'Sarova Mara Game Camp',
      description: 'Luxury tented camp inside Masai Mara NR',
      meals: 'All Meals Included',
      website: 'https://wellworthcollection.co.tz/lake-manyara-kilimamoja/',
      images: [
        '/sarovamara1.jpg',
        '/sarovamara2.jpg',
        '/sarovamara3.jpg',
        '/sarovamara4.jpg',
        '/sarovamara5.jpg',
        '/sarovamara6.jpg'
      ]
    },
    'lake-manyara-kilimamoja-lodge': {
      name: 'Lake Manyara Kilimamoja Lodge',
      description: 'Luxury lodge overlooking Lake Manyara',
      meals: 'All Meals Included',
      website: 'https://serenahotels.com',
      images: [
      '/kilima1.jpg','/kilima2.jpg','/kilima3.jpg','/kilima4.jpg','/kilima5.jpg','/kilima6.jpg','/kilima7.jpg','/kilima8.jpg','/kilima9.jpg','/kilima10.jpg','/kilima11.jpg',
      ]
    },
    'ngorongoro-lions-paw-camp': {
      name: `Ngorongoro Lion's Paw Camp`,
      description: 'Luxury tented camp located on the crater rim of Ngorongoro Crater',
      meals: 'All Meals Included',
      website: 'https://karibucamps.com/lions-paw/',
      images: [
       '/ngoro1.jpg','/ngoro2.jpg','/ngoro3.jpg','/ngoro4.jpg','/ngoro5.jpg','/ngoro6.jpg','/ngoro7.jpg',
      ]
    },
    'melia-serengeti-lodge': {
      name: 'Meliá Serengeti Lodge',
      description: 'Luxury lodge located inside Central Serengeti NP',
      meals: 'All Meals Included',
      website: 'https://www.melia.com/en/hotels/tanzania/serengeti-national-park/hotel-serengeti-lodge-melia-collection',
      images: [
        '/melia1.jpg','/melia2.jpg','/melia3.jpg','/melia4.jpg','/melia5.jpg','/melia6.jpg','/melia7.jpg','/melia8.jpg','/melia9.jpg','/melia10.jpg','/melia11.jpg','/melia12.jpg','/melia13.jpg','/melia14.jpg','/melia15.jpg'
      ]
    },
    'nasikia-mobile-migration-camp': {
      name: 'Nasikia Mobile Migration Camp (Kogatende)',
      description: 'Luxury tented camp located inside Northern Serengeti NP',
      meals: 'All Meals Included',
      website: 'https://nasikiacamps.com/camps-lodges/nasikia-mobile-migration-camp-kogatende/',
      images: [
        '/nasikia1.jpg','/nasikia2.jpg','/nasikia3.jpg','/nasikia4.jpg','/nasikia5.jpg','/nasikia6.jpg','/nasikia7.jpg','/nasikia8.jpg',
       ] },
    'paraa-safari-lodge': {
      name: 'Paraa Safari Lodge',
      description: 'Luxury lodge located inside Murchison Falls NP',
      meals: 'All Meals Included',
      website: 'https://paraalodge.com/',
      images: [
       '/paraa1.jpg','/paraa2.jpg','/paraa3.jpg','/paraa4.jpg','/paraa5.jpg','/paraa6.jpg','/paraa7.jpg','/paraa8.jpg','/paraa9.jpg','/paraa10.jpg'
      ]
    },
    'chimpundu-lodge': {
      name: 'Chimpundu Lodge',
      description: 'Luxury lodge bordering Kibale NP (Chimps) without fences',
      meals: 'All Meals Included',
      website: 'https://chimpundulodge.com/',
      images: [
        '/chimpu1.jpeg','/chimpu2.jpeg','/chimpu3.jpeg','/chimpu4.jpeg','/chimpu5.jpeg','/chimpu6.jpeg','/chimpu7.jpeg',
      ]
    },
    'mweya-safari-lodge': {
      name: 'Mweya Safari Lodge',
      description: 'Luxury lodge overlooking Kazinga Channel',
      meals: 'All Meals Included',
      website: 'https://mweyalodge.com',
      images: [
        '/mweya1.jpg','/mweya2.jpg','/mweya3.jpg','/mweya4.jpg','/mweya5.jpg','/mweya6.jpg','/mweya7.jpg',
      ]
    },
    'mahogany-springs-lodge': {
      name: 'Mahogany Springs Lodge',
      description: 'Luxury lodge bordering Bwindi Impenetrable NP (Gorillas) without fences',
      meals: 'All Meals Included',
      website: 'https://www.mahoganysprings.com/',
      images: [
        '/maho1.jpg','/maho2.jpg','/maho3.jpg','/maho4.jpg','/maho5.jpg','/maho6.jpg','/maho7.jpg','/maho8.jpg','/maho9.jpg',
      ]
    },
    'mihingo-lodge': {
      name: 'Mihingo Lodge',
      description: 'Luxury lodge bordering Lake Mburo NP without fences',
      meals: 'All Meals Included',
      website: 'https://mihingolodge.com/',
      images: [
       '/mihingo1.jpg','/mihingo2.jpg','/mihingo3.jpg','/mihingo4.jpg','/mihingo5.jpg','/mihingo6.jpg','/mihingo7.jpg',
      ]
    },
    'tiloreza-volcanoes-ecolodge': {
      name: 'Tiloreza Volcanoes Ecolodge',
      description: 'Mid-range lodge located less than 1hr drive from Volcanoes NP (Gorillas)',
      meals: 'All Meals Included',
      website: 'https://tiloreza.com/',
      images: [
  '/tilo1.jpeg','/tilo2.jpeg','/tilo3.jpeg','/tilo4.jpeg',
      ]
    },
    'maisha-sweetwaters-camp': {
      name: 'Maisha Sweetwaters Camp',
      description: 'Mid-range tented camp located just outside Ol Pejeta Conservancy (Laikipia Plateau)',
      meals: 'All Meals Included',
      website: 'https://maishasweetwaterscamp.com/',
      images: [
   '/sweetwaters1.jpg','/sweetwaters2.jpg','/sweetwaters3.jpg','/sweetwaters4.jpg','/sweetwaters5.jpg','/sweetwaters6.jpg',
      ]
    },
    'ashnil-samburu-camp': {
      name: 'Ashnil Samburu Camp',
      description: 'Luxury tented camp bordering Samburu NR without fences',
      meals: 'All Meals Included',
      website: 'https://ashnilhotels.com/samburu/',
      images: [
        '/Ashnil1.jpg','/Ashnil2.jpg','/Ashnil3.jpg','/Ashnil4.jpg','/Ashnil5.jpg','/Ashnil6.jpg','/Ashnil7.jpg','/Ashnil8.jpg','/Ashnil9.jpg',
      ]
    },
     'jambo-mara-safari-lodge': {
      name: 'Jambo Mara Safari Lodge',
      description: 'Mid-range resort bordering Masai Mara NR without fences',
      meals: 'All Meals Included',
      website: 'https://jambomara.com/',
      images: [
        '/jambo1.jpg','/jambo2.jpg','/jambo3.jpg','/jambo4.jpg','/jambo5.jpg','/jambo6.jpg','/jambo7.jpg','/jambo8.jpg','/jambo9.jpg','/jambo10.jpg','/jambo11.jpg','/jambo12.jpg','/jambo13.jpg','/jambo14.jpg',
      ]   
  },
    'avian-court-hotel': {
      name: 'Avian Court Hotel',
      description: 'Mid-range hotel located near Lake Naivasha (Naivasha)',
      meals: 'All Meals Included',
      website: 'https://aviancourthotel.com/',
      images: [
        '/avian1.jpg','/avian2.jpg','/avian3.jpg','/avian4.png','/avian5.jpg','/avian6.jpg','/avian7.jpg','/avian8.png','/avian9.png','/avian10.png',
      ]   
  }, 
      'hunter-luxury-lodge': {
      name: `Hunter's Luxury Manor`,
      description: 'Luxury tented camp located less than 1hr drive from Amboseli NP',
      meals: 'All Meals Included',
      website: 'https://huntersluxurymanor.com/',
      images: [
        '/hunter1.png','/hunter2.png','/hunter3.jpg','/hunter4.jpg','/hunter5.jpg',
      ]   
  },
     'ziwa-bush-lodge': {
      name: `Ziwa Bush Lodge`,
      description: 'Mid-range lodge located just outside Lake Nakuru NP',
      meals: 'All Meals Included',
      website: 'https://www.ziwalodge.com/',
      images: [
        '/ziwa.png','/ziwa2.png','/ziwa3.png','/ziwa4.avif','/ziwa5.png','/ziwa6.jpg',
      ]   
  }, 
    'mara-engai-lodge': {
      name: 'Mara Engai Lodge',
      description: 'Luxury tented camp bordering Mara Triangle (Masai Mara NR) without fences',
      meals: 'All Meals Included',
      website: 'https://www.maraengai.info/',
      images: [
       'engai1.jpeg','engai2.jpeg','engai3.jpeg','engai4.jpg','engai5.jpg','engai6.jpg','engai7.jpg','engai8.jpg','engai9.jpg','engai10.jpg','engai11.jpg','engai12.jpg','engai13.jpg',
      ]   

  },

  // ========================================
  // TOUR ACCOMMODATION MAPPING
  // ========================================
  // Maps each tour's days to specific hotel IDs
  // To assign accommodation to a specific day, simply add: day_number: 'hotel-id'
  // Example: To show Sarova Hotel on day 5, add: 5: 'sarova-mara-game-camp'
  tourAccommodations: {
    '7-Day-Kenyan-Luxury-Safari': {
      1: 'ol-tukai-lodge',
      2: 'ol-tukai-lodge',
      3: 'lake-naivasha-sopa-resort',
      4: 'sarova-lion-hill-game-lodge',
      5: 'sarova-mara-game-camp',  // Example: Sarova hotel displayed on day 5
      6: 'sarova-mara-game-camp'
    },
    'tanzania-great-migration': {
      1: 'lake-manyara-kilimamoja-lodge',
      2: 'ngorongoro-lions-paw-camp',
      3: 'melia-serengeti-lodge',
      4: 'melia-serengeti-lodge',
      '5-6': 'nasikia-mobile-migration-camp'
    },
    'Uganda-Ultimate-Luxury-Safari': {
      1: 'paraa-safari-lodge',
      2: 'paraa-safari-lodge',
      3: 'chimpundu-lodge',
      4: 'chimpundu-lodge',
      5: 'mweya-safari-lodge',
      6: 'mweya-safari-lodge',
      7: 'mahogany-springs-lodge',
      8: 'mahogany-springs-lodge',
      9: 'mihingo-lodge'
    },
    'rwanda-mountain-gorillas': {
      1: 'tiloreza-volcanoes-ecolodge',
        2: 'tiloreza-volcanoes-ecolodge',
        3: 'tiloreza-volcanoes-ecolodge',
    },
    
      '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli': {
      1: 'maisha-sweetwaters-camp',
      2: 'ashnil-samburu-camp',
      3: 'ashnil-samburu-camp',
      4: 'ziwa-bush-lodge',
      5: 'jambo-mara-safari-lodge',
      6: 'jambo-mara-safari-lodge',
      7: 'avian-court-hotel',
      8: 'hunter-luxury-lodge',
      9: 'hunter-luxury-lodge',
      10: ''

    },
    '3-day-mara-fly-in-fly-out': { 
      1: 'mara-engai-lodge',
      2: 'mara-engai-lodge',
      3: '',
    },
  
} 

} };
 
// ========================================
// CENTRALIZED ANIMAL AVAILABILITY MANAGEMENT SYSTEM
// ========================================
// All animal availability data for destinations is managed here
// To add a new destination, simply add it to the destinations object
// To update animal availability for a specific destination, edit the animals array
// To update seasonal information, edit the bestTimeToVisit, highSeason, and bestWeather fields

const ANIMAL_AVAILABILITY_MANAGER = {
  // ========================================
  // DESTINATION DEFINITIONS WITH SEASONAL DATA
  // ========================================
  destinations: {
    'Amboseli National Park': {
      mainDestination: 'Amboseli National Park',
      bestTimeToVisit: 'June to October and January to February',
      highSeason: 'December to March and July to October (Busy)',
      bestWeather: 'June to September and January to February (Little rainfall)',
      animals: [
{ name: "Elephant", abundance: "abundant", image: "/elephant.jpg" },
{ name: "Giraffe", abundance: "common", image: "/giraffe.png" },
{ name: "Buffalo", abundance: "abundant", image: "/buffalo.png" },
{ name: "Zebra", abundance: "abundant", image: "/zebra.png" },
{ name: "Wildebeest", abundance: "abundant", image: "/wildebeest.png" },
{ name: "Hippo", abundance: "common", image: "/hippo.png" },
{ name: "Hyena", abundance: "common", image: "/hyena.png" },
{ name: "Lion", abundance: "occasional", image: "/lion.png" },
{ name: "Cheetah", abundance: "occasional", image: "/cheetah.png" },
{ name: "White Rhino", abundance: "none", image: "/white-rhino.png" },
{ name: "Black Rhino", abundance: "none", image: "/black-rhino.png" },
{ name: "Leopard", abundance: "rare to none", image: "/leopard.png" },
{ name: "Wild Dog", abundance: "none", image: "/wild-dog.png" }

]
    },
    'Lake Naivasha': {
      mainDestination: 'Lake Naivasha',
      bestTimeToVisit: 'All year round',
      highSeason: 'December to March',
      bestWeather: 'Dry season (June to September)',
      animals: [
    { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
            { name: 'White Rhino', abundance: 'common', image: '/white-rhino.png' },
            { name: 'Buffalo', abundance: 'common', image: '/buffalo.png' },
            { name: 'Zebra', abundance: 'common', image: '/zebra.png' },
            { name: 'Hippo', abundance: 'common', image: '/hippo.png' },
            { name: 'Black Rhino', abundance: 'occasional', image: '/black-rhino.png' },
            { name: 'Lion', abundance: 'occasional', image: '/lion.png' },
            { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
            { name: 'Hyena', abundance: 'occasional', image: '/hyena.png' },
            { name: 'Elephant', abundance: 'none', image: '/elephant.png' },
            { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
            { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
            { name: 'Wild Dog', abundance: 'none', image: '/wild-dog.png' }
      ]
    },
    'Lake Nakuru National Park': {
      mainDestination: 'Lake Nakuru National Park',
      bestTimeToVisit: 'June to March',
      highSeason: 'July to October',
      bestWeather: 'Clear skies for flamingo viewing',
      animals: [
          { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
            { name: 'White Rhino', abundance: 'common', image: '/white-rhino.png' },
            { name: 'Buffalo', abundance: 'common', image: '/buffalo.png' },
            { name: 'Zebra', abundance: 'common', image: '/zebra.png' },
            { name: 'Hippo', abundance: 'common', image: '/hippo.png' },
            { name: 'Black Rhino', abundance: 'occasional', image: '/black-rhino.png' },
            { name: 'Lion', abundance: 'occasional', image: '/lion.png' },
            { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
            { name: 'Hyena', abundance: 'occasional', image: '/hyena.png' },
            { name: 'Elephant', abundance: 'none', image: '/elephant.png' },
            { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
            { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
            { name: 'Wild Dog', abundance: 'none', image: '/wild-dog.png' }
      ]
    },
    'Masai Mara National Reserve': {
      mainDestination: 'Masai Mara National Reserve',
      bestTimeToVisit: 'June to October (For general wildlife viewing) and July or August to October (For wildebeest migration)',
      highSeason: 'June to October and December to March',
      bestWeather: 'June to October (Sunny, but not too hot)',
      animals: [
    { name: "Elephant", abundance: "Common", image: "/elephant.png" },
  { name: "Giraffe", abundance: "Common", image: "/giraffe.png" },
  { name: "Lion", abundance: "Common", image: "/lion.png" },
  { name: "Cheetah", abundance: "Common", image: "/cheetah.png" },
  { name: "Zebra", abundance: "Abundant", image: "/zebra.png" },
  { name: "Wildebeest", abundance: "Abundant", image: "/wildebeest.png" },
  { name: "Buffalo", abundance: "Common", image: "/buffalo.png" },
  { name: "Hippo", abundance: "Common", image: "/hippo.png" },
  { name: "Hyena", abundance: "Common", image: "/hyena.png" },
  { name: "Leopard", abundance: "Occasional", image: "/leopard.png" },
  { name: "Black Rhino", abundance: "Rare", image: "/black-rhino.png" },
  { name: "Wild Dog", abundance: "Very Rare", image: "/wild-dog.png" },
  { name: "White Rhino", abundance: "None", image: "/white-rhino.png" }
      ]
    },
    'Lake Manyara National Park': {
      mainDestination: 'Lake Manyara National Park',
      bestTimeToVisit: 'June to October (Easier to spot animals)',
      highSeason: 'July to March (The northern section gets crowded)',
      bestWeather: 'June to October (Little rainfall)',
      animals: [
   { name: "Elephant", abundance: "Common", image: "/elephant.png" },
  { name: "Giraffe", abundance: "Common", image: "/giraffe.png" },
  { name: "Buffalo", abundance: "Common", image: "/buffalo.png" },
  { name: "Zebra", abundance: "Common", image: "/zebra.png" },
  { name: "Wildebeest", abundance: "Common", image: "/wildebeest.png" },
  { name: "Hippo", abundance: "Common", image: "/hippo.png" },
  { name: "Lion", abundance: "Occasional", image: "/lion.png" },
  { name: "Hyena", abundance: "Occasional", image: "/hyena.png" },
  { name: "Leopard", abundance: "Rare", image: "/leopard.png" },
  { name: "Wild Dog", abundance: "Very Rare", image: "/wild-dog.png" },
  { name: "White Rhino", abundance: "None", image: "/white-rhino.png" },
  { name: "Black Rhino", abundance: "None", image: "/black-rhino.png" },
  { name: "Cheetah", abundance: "None", image: "/cheetah.png" }
  
      ]
    },

    'Ngorongoro Crater': {
      mainDestination: 'Ngorongoro Crater',
      bestTimeToVisit: 'June to October (Wildlife viewing is best)',
      highSeason: 'Most of the year – July to March (Expect crowds)',
      bestWeather: 'June to October (Rainfall is little to none)',
      animals: [
     { name: "Black Rhino", abundance: "Common", image: "/black-rhino.png" },
  { name: "Lion", abundance: "Common", image: "/lion.png" },
  { name: "Buffalo", abundance: "Abundant", image: "/buffalo.png" },
  { name: "Zebra", abundance: "Abundant", image: "/zebra.png" },
  { name: "Wildebeest", abundance: "Abundant", image: "/wildebeest.png" },
  { name: "Hyena", abundance: "Abundant", image: "/hyena.png" },
  { name: "Elephant", abundance: "Common", image: "/elephant.jpg" },
  { name: "Hippo", abundance: "Common", image: "/hippo.png" },
  { name: "Leopard", abundance: "Occasional", image: "/leopard.png" },
  { name: "Giraffe", abundance: "None", image: "/giraffe.png" },
  { name: "White Rhino", abundance: "None", image: "/white-rhino.png" },
  { name: "Cheetah", abundance: "None", image: "/cheetah.png" },
  { name: "Wild Dog", abundance: "None", image: "/wild-dog.png" }
      ]
    },
    'Central Serengeti National Park': {
      mainDestination: 'Central Serengeti National Park',
      bestTimeToVisit: 'January to February and June to October (Different areas are best at different times)',
      highSeason: 'July to March (The Seronera area is crowded)',
      bestWeather: 'June to October (Little to no rainfall)',
      animals: [
        { name: 'Elephant', abundance: 'common', image: '/elephant.png' },
      { name: 'Lion', abundance: 'common', image: '/lion.png' },
      { name: 'Cheetah', abundance: 'common', image: '/cheetah.png' },
      { name: 'Buffalo', abundance: 'abundant', image: '/buffalo.png' },
      { name: 'Zebra', abundance: 'abundant', image: '/zebra.png' },
      { name: 'Wildebeest', abundance: 'abundant', image: '/wildebeest.png' },
      { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
      { name: 'Hippo', abundance: 'common', image: '/hippo.png' },
      { name: 'Hyena', abundance: 'common', image: '/hyena.png' },
      { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
      { name: 'Black Rhino', abundance: 'very rare', image: '/black-rhino.png' },
      { name: 'Wild Dog', abundance: 'very rare', image: '/wild-dog.png' },
      { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' }
      ]
    },
    'Murchison Falls National Park': {
      mainDestination: 'Murchison Falls National Park',
      bestTimeToVisit: 'December to February (Easier to spot animals)',
      highSeason: 'June to September (Peak time for Uganda)',
      bestWeather: 'June and July (Less rain and lower temperatures)',
      animals: [
          { name: 'Chimpanzee', abundance: 'occasional', image: '/chimpanzee.png' },
          { name: 'Elephant', abundance: 'common', image: '/elephant.png' },
          { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
          { name: 'Lion', abundance: 'common', image: '/lion.png' },
          { name: 'Buffalo', abundance: 'common', image: '/buffalo.png' },
          { name: 'Hippo', abundance: 'abundant', image: '/hippo.png' },
          { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
          { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
          { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
          { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
          { name: 'Zebra', abundance: 'none', image: '/zebra.png' },
          { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
          { name: 'Wild Dog', abundance: 'none', image: '/wild-dog.png' }
      ]
    },
    'Kibale National Park': {
      mainDestination: 'Kibale National Park',
      bestTimeToVisit: 'January to February and June to July (Chimp trekking is easiest)',
      highSeason: 'June to September (Peak time for Uganda)',
      bestWeather: 'January to February and June to July (Least rain)',
      animals: [
          { name: 'Chimpanzee', abundance: 'common', image: '/chimpanzee.png' },
          { name: 'Elephant', abundance: 'occasional', image: '/elephant.png' },
          { name: 'Buffalo', abundance: 'occasional', image: '/buffalo.png' },
          { name: 'Lion', abundance: 'very rare', image: '/lion.png' },
          { name: 'Leopard', abundance: 'very rare', image: '/leopard.png' },
          { name: 'Hippo', abundance: 'rare', image: '/hippo.png' },
          { name: 'Giraffe', abundance: 'none', image: '/giraffe.png' },
          { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
          { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
          { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
          { name: 'Zebra', abundance: 'none', image: '/zebra.png' },
          { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' }
      ]
  },
  'Queen Elizabeth National Park': {
      mainDestination: 'Queen Elizabeth National Park',
      bestTimeToVisit: 'January to February and June to July (Dry seasons)',
      highSeason: 'June to September (Peak time for Uganda)',
      bestWeather: 'June to July and January to February (Less rainfall)',
      animals: [
          { name: 'Chimpanzee', abundance: 'occasional', image: '/chimpanzee.png' },
        { name: 'Elephant', abundance: 'common', image: '/elephant.png' },
        { name: 'Lion', abundance: 'common', image: '/lion.png' },
        { name: 'Buffalo', abundance: 'common', image: '/buffalo.png' },
        { name: 'Hippo', abundance: 'abundant', image: '/hippo.png' },
        { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
        { name: 'Giraffe', abundance: 'none', image: '/giraffe.png' },
        { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
        { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
        { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
        { name: 'Zebra', abundance: 'none', image: '/zebra.png' },
        { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
        { name: 'Wild Dog', abundance: 'none', image: '/wild-dog.png' }
      ]
  },
    'Bwindi Impenetrable National Park (Gorillas)': {
      mainDestination: 'Bwindi Impenetrable National Park (Gorillas)',
      bestTimeToVisit: 'June to August and December to February (Gorilla trekking is easiest)',
      highSeason: 'June to September (Gorilla permits are scarce)',
      bestWeather: 'June to July and December to February (Less rainfall)',
      animals: [
          { name: 'Gorilla', abundance: 'common', image: '/gorilla.png' },
        { name: 'Chimpanzee', abundance: 'rare', image: '/chimpanzee.png' },
        { name: 'Elephant', abundance: 'rare', image: '/elephant.png' },
        { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
        { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
        { name: 'Lion', abundance: 'none', image: '/lion.png' },
        { name: 'Giraffe', abundance: 'none', image: '/giraffe.png' },
        { name: 'Leopard', abundance: 'none', image: '/leopard.png' },
        { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
        { name: 'Buffalo', abundance: 'none', image: '/buffalo.png' },
        { name: 'Zebra', abundance: 'none', image: '/zebra.png' },
        { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
        { name: 'Hippo', abundance: 'none', image: '/hippo.png' }
      ]
  },
      'Lake Mburo National Park': {
      mainDestination: 'Lake Mburo National Park',
      bestTimeToVisit: 'January to February and June to August (Dry seasons)',
      highSeason: 'June to September (Peak time for Uganda)',
      bestWeather: 'June to August and January to February (Little rainfall)',
      animals: [
              { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
              { name: 'Buffalo', abundance: 'common', image: '/buffalo.png' },
              { name: 'Zebra', abundance: 'common', image: '/zebra.png' },
              { name: 'Hippo', abundance: 'common', image: '/hippo.png' },
              { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
              { name: 'Hyena', abundance: 'occasional', image: '/hyena.png' },
              { name: 'Elephant', abundance: 'none', image: '/elephant.png' },
              { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
              { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
              { name: 'Lion', abundance: 'none', image: '/lion.png' },
              { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
              { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
              { name: 'Wild Dog', abundance: 'none', image: '/wild-dog.png' }
      ]
  },
        'Volcanoes National Park (Gorillas)': {
      mainDestination: 'Volcanoes National Park (Gorillas)',
      bestTimeToVisit: 'June to August (It is drier and hiking is easier)',
      highSeason: 'June to September (Permits are scarce)',
      bestWeather: 'June to October (Sunny, but not too hot)',
      animals: [
               { name: 'Gorilla', abundance: 'common', image: '/gorilla.png' },
              { name: 'Chimpanzee', abundance: 'rare', image: '/chimpanzee.png' },
              { name: 'Elephant', abundance: 'rare', image: '/elephant.png' },
              { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
              { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
              { name: 'Lion', abundance: 'none', image: '/lion.png' },
              { name: 'Giraffe', abundance: 'none', image: '/giraffe.png' },
              { name: 'Leopard', abundance: 'none', image: '/leopard.png' },
              { name: 'Cheetah', abundance: 'none', image: '/cheetah.png' },
              { name: 'Buffalo', abundance: 'none', image: '/buffalo.png' },
              { name: 'Zebra', abundance: 'none', image: '/zebra.png' },
              { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' },
              { name: 'Hippo', abundance: 'none', image: '/hippo.png' }
      ]
  },
          'Ol Pejeta Conservancy (Laikipia Plateau)': {
      mainDestination: 'Ol Pejeta Conservancy (Laikipia Plateau)',
      bestTimeToVisit: 'June to September (Dry season)',
      highSeason: 'June to October and December to March',
      bestWeather: 'June to September and December to February (Less rain)',
      animals: [
            { name: 'Elephant', abundance: 'common', image: '/elephant.png' },
            { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
            { name: 'White Rhino', abundance: 'common', image: '/white-rhino.png' },
            { name: 'Black Rhino', abundance: 'common', image: '/black-rhino.png' },
            { name: 'Buffalo', abundance: 'common', image: '/buffalo.png' },
            { name: 'Zebra', abundance: 'common', image: '/zebra.png' },
            { name: 'Hyena', abundance: 'common', image: '/hyena.png' },
            { name: 'Lion', abundance: 'occasional', image: '/lion.png' },
            { name: 'Cheetah', abundance: 'occasional', image: '/cheetah.png' },
            { name: 'Wildebeest', abundance: 'occasional', image: '/wildebeest.png' },
            { name: 'Hippo', abundance: 'occasional', image: '/hippo.png' },
            { name: 'Leopard', abundance: 'rare', image: '/leopard.png' },
            { name: 'Wild Dog', abundance: 'rare', image: '/wild-dog.png' }
      ]
  },
            'Samburu National Reserve': {
      mainDestination: 'Samburu National Reserve',
      bestTimeToVisit: 'June to September and January to February',
      highSeason: 'December to March and July to October (Busy)',
      bestWeather: 'June and December (Cool and fresh after rain)',
      animals: [
        { name: 'Elephant', abundance: 'abundant', image: '/elephant.png' },
        { name: 'Giraffe', abundance: 'common', image: '/giraffe.png' },
        { name: 'Zebra', abundance: 'common', image: '/zebra.png' },
        { name: 'Lion', abundance: 'occasional', image: '/lion.png' },
        { name: 'Leopard', abundance: 'occasional', image: '/leopard.png' },
        { name: 'Buffalo', abundance: 'occasional', image: '/buffalo.png' },
        { name: 'Hippo', abundance: 'occasional', image: '/hippo.png' },
        { name: 'Hyena', abundance: 'occasional', image: '/hyena.png' },
        { name: 'Cheetah', abundance: 'rare', image: '/cheetah.png' },
        { name: 'Wild Dog', abundance: 'rare', image: '/wild-dog.png' },
        { name: 'White Rhino', abundance: 'none', image: '/white-rhino.png' },
        { name: 'Black Rhino', abundance: 'none', image: '/black-rhino.png' },
        { name: 'Wildebeest', abundance: 'none', image: '/wildebeest.png' }
      ]
  },



}, 

  // ========================================
  // TOUR DESTINATION MAPPING
  // ========================================
  // Maps each tour's days to specific destination keys for animal availability
  tourDestinations: {
    '7-Day-Kenyan-Luxury-Safari': {
      1: 'Amboseli National Park',
      2: 'Amboseli National Park',
      3: 'Lake Naivasha',
      4: 'Lake Nakuru National Park',
      5: 'Masai Mara National Reserve',
      6: 'Masai Mara National Reserve'
    },
    'tanzania-great-migration': {
      1: 'Lake Manyara National Park',
      2: 'Ngorongoro Crater',
      3: 'Central Serengeti National Park',
      4: 'Central Serengeti National Park',
      '5-6': 'Central Serengeti National Park'
    },
    'Uganda-Ultimate-Luxury-Safari': {
      1: 'Murchison Falls National Park',
      2: 'Murchison Falls National Park',
      3: 'Kibale National Park',
      4: 'Kibale National Park',
      5: 'Queen Elizabeth National Park',
      6: 'Queen Elizabeth National Park',
      7: 'Bwindi Impenetrable National Park (Gorillas)',
      8: 'Bwindi Impenetrable National Park (Gorillas)',
      9: 'Lake Mburo National Park'
    },
    'rwanda-mountain-gorillas': {
      1: 'Volcanoes National Park (Gorillas)',
      2: 'Volcanoes National Park (Gorillas)',
      3: 'Volcanoes National Park (Gorillas)'
    },
    '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli': {
      1: 'Ol Pejeta Conservancy (Laikipia Plateau)',
      2: 'Samburu National Reserve',
      3: 'Samburu National Reserve',
      4: 'Lake Nakuru National Park',
      5: 'Masai Mara National Reserve',
      6: 'Masai Mara National Reserve',
      7: 'Lake Naivasha',
      8: 'Amboseli National Park',
      9: 'Amboseli National Park'
    },
    '3-day-mara-fly-in-fly-out': {
      1: 'Masai Mara National Reserve',
      2: 'Masai Mara National Reserve'
    }
  }
};

// ========================================
// ANIMAL AVAILABILITY HELPER FUNCTIONS
// ========================================

/**
 * Get animal availability data for a specific tour day
 */
const getAnimalAvailabilityForDay = (tourId, day) => {
  try {
    if (!tourId || !day) return null;
    
    const tourDestinations = ANIMAL_AVAILABILITY_MANAGER.tourDestinations[tourId];
    if (!tourDestinations) return null;

    let destinationKey = tourDestinations[day];
    
    // If not found and day is a number, check for day ranges
    if (!destinationKey && typeof day === 'number') {
      for (const dayKey in tourDestinations) {
        if (dayKey.includes('-')) {
          const [start, end] = dayKey.split('-').map(d => parseInt(d));
          if (!isNaN(start) && !isNaN(end) && day >= start && day <= end) {
            destinationKey = tourDestinations[dayKey];
            break;
          }
        }
      }
    }

    if (!destinationKey) return null;

    const destinationData = ANIMAL_AVAILABILITY_MANAGER.destinations[destinationKey];
    if (!destinationData) return null;

    return {
      key: destinationKey,
      ...destinationData
    };
  } catch (error) {
    console.warn('Error getting animal availability:', error);
    return null;
  }
};

/**
 * Sort animals by abundance level (highest to lowest)
 */
const sortAnimalsByAbundance = (animals) => {
  if (!Array.isArray(animals)) return [];
  
  const abundancePriority = {
    'abundant': 5,
    'common': 4,
    'occasional': 3,
    'rare': 2,
    'very rare': 1,
    'very-rare': 1,
    'none': 0
  };

  return [...animals].sort((a, b) => {
    const aPriority = abundancePriority[a?.abundance?.toLowerCase()] || 0;
    const bPriority = abundancePriority[b?.abundance?.toLowerCase()] || 0;
    return bPriority - aPriority;
  });
};

// ========================================
// ACCOMMODATION HELPER FUNCTIONS
// ========================================

/**
 * Get accommodation data for a specific tour day
 */
const getAccommodationForDay = (tourId, day) => {
  // try {
   console.log('tourId:', tourId);
    console.log('day:', day);

    if (!tourId || !day) {
            console.log('tourId or day is missing. Returning null.');
      return null;
    }
    
    // Get the tour's accommodation mapping
   const tourAccommodations = ACCOMMODATION_MANAGER.tourAccommodations[tourId];
   
     console.log('tourAccommodations:', tourAccommodations);
    if (!tourAccommodations) return null;

    // Try to find accommodation for the specific day
    let hotelId = tourAccommodations[day];
    
    // If not found and day is a number, also check for day ranges that might include this day
   if (!hotelId && typeof day === 'number') {
       
      // Check for ranges like "5-6", "2-4", etc.
      for (const dayKey in tourAccommodations) {
        if (dayKey.includes('-')) {
          const [start, end] = dayKey.split('-').map(d => parseInt(d));
          if (!isNaN(start) && !isNaN(end) && day >= start && day <= end) {
            hotelId = tourAccommodations[dayKey];
            break;
          }
        }
      }
    }

    // If still no hotel found, return null
    if (!hotelId) return null;

    // Get the hotel data
    const hotelData = ACCOMMODATION_MANAGER.hotels[hotelId];
    if (!hotelData) return null;

    return {
      id: hotelId,
      ...hotelData
    };
  // } catch (error) {
  //   console.warn('Error getting accommodation:', error);
  //   return null;
  // }
};

// ========================================
// IMAGE HELPER FUNCTIONS
// ========================================

/**
 * Get the main thumbnail image for a tour card
 */
const getTourThumbnail = (tourId) => {
  if (!tourId) return IMAGE_MANAGER.tourThumbnails['custom-trip'];
  return IMAGE_MANAGER.tourThumbnails[tourId] || IMAGE_MANAGER.tourThumbnails['custom-trip'];
};

/**
 * Get the main hero image for a tour detail page
 */
const getMainTourImage = (tourId) => {
  if (!tourId) return IMAGE_MANAGER.tourHeroImages['custom-trip'];
  return IMAGE_MANAGER.tourHeroImages[tourId] || IMAGE_MANAGER.tourHeroImages['custom-trip'];
};

/**
 * Get the daily itinerary image for a specific day
 */
const getDailyItineraryImage = (tourId, day) => {
  try {
    if (!tourId || !day) return IMAGE_MANAGER.dailyItineraryImages['custom-trip'][1];
    
    const tourImages = IMAGE_MANAGER.dailyItineraryImages[tourId];
    if (!tourImages) return IMAGE_MANAGER.dailyItineraryImages['custom-trip'][1];
    
    return tourImages[day] || tourImages[1] || IMAGE_MANAGER.dailyItineraryImages['custom-trip'][1];
  } catch (error) {
    console.warn('Error getting daily itinerary image:', error);
    return IMAGE_MANAGER.dailyItineraryImages['custom-trip'][1];
  }
};

/**
 * Get vehicle images for the popup
 */
const getVehicleImages = () => {
  return IMAGE_MANAGER.vehicleImages || [];
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Custom Animal Icons Component
const AnimalIcon = ({ type, className = "w-6 h-6" }) => {
  const iconMap = {
    'Giraffe': <TreePine className={className} />,
    'Warthog': <Mountain className={className} />,
    'Baboon': <Cat className={className} />,
    'Vervet Monkey': <Cat className={className} />,
    'Lion': <Zap className={className} />,
    'Buffalo': <Mountain className={className} />,
    'Zebra': <Zap className={className} />,
    'White Rhino': <Shield className={className} />,
    'Black Rhino': <Shield className={className} />,
    'Leopard': <Cat className={className} />,
    'Cheetah': <Zap className={className} />,
    'Hyena': <Dog className={className} />,
    'Elephant': <Mountain className={className} />,
    'Wildebeest': <Mountain className={className} />,
    'Hippo': <Mountain className={className} />,
    'Impala': <Rabbit className={className} />,
    'Gazelle': <Rabbit className={className} />,
    'Waterbuck': <Rabbit className={className} />,
    'Colobus Monkey': <Cat className={className} />,
    'Fish Eagle': <Bird className={className} />,
    'Pelican': <Bird className={className} />,
    'Flamingo': <Bird className={className} />,
    'Topi': <Rabbit className={className} />,
    'Crocodile': <Fish className={className} />,
    'Lesser Kudu': <Rabbit className={className} />,
    'Gerenuk': <Rabbit className={className} />,
    'Gorilla': <Mountain className={className} />,
    'Chimpanzee': <Cat className={className} />,
    'Wild Dog': <Dog className={className} />
  };
  
  return iconMap[type] || <Cat className={className} />;
};

// Enhanced Wildlife data for each destination with improved matching and new icons
const wildlifeData = {
  // Primary keys that match exactly
  'Nairobi': [
    { name: 'Giraffe', abundance: 'common' },
    { name: 'Warthog', abundance: 'common' },
    { name: 'Baboon', abundance: 'abundant' },
    { name: 'Vervet Monkey', abundance: 'abundant' },
    { name: 'Lion', abundance: 'occasional' },
    { name: 'Buffalo', abundance: 'common' },
    { name: 'Zebra', abundance: 'common' },
    { name: 'White Rhino', abundance: 'common' },
    { name: 'Black Rhino', abundance: 'occasional' },
    { name: 'Leopard', abundance: 'rare' },
    { name: 'Cheetah', abundance: 'rare' },
    { name: 'Hyena', abundance: 'occasional' }
  ],
  'Amboseli National Park': [
    { name: 'Elephant', abundance: 'abundant' },
    { name: 'Giraffe', abundance: 'common' },
    { name: 'Buffalo', abundance: 'abundant' },
    { name: 'Zebra', abundance: 'abundant' },
    { name: 'Wildebeest', abundance: 'abundant' },
    { name: 'Hippo', abundance: 'common' },
    { name: 'Hyena', abundance: 'common' },
    { name: 'Lion', abundance: 'common' },
    { name: 'Cheetah', abundance: 'occasional' },
    { name: 'Leopard', abundance: 'rare' },
    { name: 'Impala', abundance: 'abundant' },
    { name: 'Gazelle', abundance: 'abundant' }
  ],
  'Lake Naivasha': [
    { name: 'Hippo', abundance: 'abundant' },
    { name: 'Giraffe', abundance: 'common' },
    { name: 'Zebra', abundance: 'common' },
    { name: 'Impala', abundance: 'abundant' },
    { name: 'Waterbuck', abundance: 'common' },
    { name: 'Buffalo', abundance: 'common' },
    { name: 'Baboon', abundance: 'abundant' },
    { name: 'Vervet Monkey', abundance: 'abundant' },
    { name: 'Colobus Monkey', abundance: 'occasional' },
    { name: 'Fish Eagle', abundance: 'common' },
    { name: 'Pelican', abundance: 'common' }
  ],
  'Lake Nakuru National Park': [
    { name: 'Flamingo', abundance: 'abundant' },
    { name: 'White Rhino', abundance: 'common' },
    { name: 'Black Rhino', abundance: 'occasional' },
    { name: 'Buffalo', abundance: 'abundant' },
    { name: 'Leopard', abundance: 'occasional' },
    { name: 'Lion', abundance: 'occasional' },
    { name: 'Giraffe', abundance: 'common' },
    { name: 'Zebra', abundance: 'common' },
    { name: 'Waterbuck', abundance: 'common' },
    { name: 'Hippo', abundance: 'occasional' }
  ],
  'Masai Mara National Reserve': [
    { name: 'Lion', abundance: 'abundant' },
    { name: 'Leopard', abundance: 'common' },
    { name: 'Cheetah', abundance: 'common' },
    { name: 'Elephant', abundance: 'abundant' },
    { name: 'Buffalo', abundance: 'abundant' },
    { name: 'Zebra', abundance: 'abundant' },
    { name: 'Wildebeest', abundance: 'abundant' },
    { name: 'Giraffe', abundance: 'common' },
    { name: 'Hippo', abundance: 'common' },
    { name: 'Hyena', abundance: 'common' },
    { name: 'Black Rhino', abundance: 'rare' },
    { name: 'Topi', abundance: 'abundant' },
    { name: 'Impala', abundance: 'abundant' }
  ],
  'Tsavo West National Park': [
    { name: 'Elephant', abundance: 'abundant' },
    { name: 'Buffalo', abundance: 'common' },
    { name: 'Giraffe', abundance: 'common' },
    { name: 'Zebra', abundance: 'common' },
    { name: 'Hippo', abundance: 'common' },
    { name: 'Crocodile', abundance: 'common' },
    { name: 'Leopard', abundance: 'occasional' },
    { name: 'Lion', abundance: 'occasional' },
    { name: 'Black Rhino', abundance: 'occasional' },
    { name: 'Lesser Kudu', abundance: 'occasional' },
    { name: 'Gerenuk', abundance: 'rare' }
  ]
};

// Enhanced function to match location to wildlife data
const getWildlifeForLocation = (locationString) => {
  if (!locationString) return null;
  
  const locationLower = locationString.toLowerCase();
  
  // Enhanced matching logic
  if (locationLower.includes('nairobi')) return wildlifeData['Nairobi'];
  if (locationLower.includes('amboseli')) return wildlifeData['Amboseli National Park'];
  if (locationLower.includes('naivasha')) return wildlifeData['Lake Naivasha'];
  if (locationLower.includes('nakuru')) return wildlifeData['Lake Nakuru National Park'];
  if (locationLower.includes('masai mara') || locationLower.includes('maasai mara')) return wildlifeData['Masai Mara National Reserve'];
  if (locationLower.includes('tsavo')) return wildlifeData['Tsavo West National Park'];
  
  return null;
};

// Sample reviews data
const reviewsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    date: "March 2024",
    review: "Absolutely incredible experience! The wildlife encounters were beyond my expectations. Our guide was knowledgeable and passionate.",
    avatar: "SJ",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "London, UK",
    rating: 5,
    date: "February 2024",
    review: "Perfect organization from start to finish. The accommodations were luxurious and the game drives were thrilling!",
    avatar: "MC",
    verified: true
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    date: "January 2024",
    review: "A once-in-a-lifetime adventure! The sunset over the Masai Mara was breathtaking. Highly recommended!",
    avatar: "ER",
    verified: true
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Sydney, Australia",
    rating: 4,
    date: "December 2023",
    review: "Great safari experience with excellent service. The Big Five sightings were amazing!",
    avatar: "DW",
    verified: true
  },
  {
    id: 5,
    name: "Lisa Thompson",
    location: "Toronto, Canada",
    rating: 5,
    date: "November 2023",
    review: "The best vacation we've ever taken! The guides were incredible and we saw everything on our wish list.",
    avatar: "LT",
    verified: true
  },
  {
    id: 6,
    name: "James Anderson",
    location: "Melbourne, Australia",
    rating: 5,
    date: "October 2023",
    review: "Exceeded all expectations. The accommodations were fantastic and the wildlife sightings were spectacular!",
    avatar: "JA",
    verified: true
  }
];

// Safari tips data
const safariTips = [
  {
    icon: <Camera className="w-5 h-5" />,
    title: "Photography Tips",
    tip: "Bring extra batteries and memory cards. The golden hours (sunrise and sunset) offer the best lighting for wildlife photography."
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: "What to Pack",
    tip: "Pack neutral-colored clothing, a good hat, sunscreen, and binoculars. Avoid bright colors that might disturb wildlife."
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Health & Safety",
    tip: "Consult your doctor about vaccinations. Malaria prophylaxis may be recommended depending on the season and locations."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Respect Wildlife",
    tip: "Maintain safe distances from animals, never feed wildlife, and always follow your guide's instructions for a safe experience."
  },
  {
    icon: <Sunrise className="w-5 h-5" />,
    title: "Best Game Drive Times",
    tip: "Early morning (6-9 AM) and late afternoon (4-7 PM) are optimal for wildlife viewing when animals are most active."
  },
  {
    icon: <Wind className="w-5 h-5" />,
    title: "Weather Preparation",
    tip: "East Africa can have sudden weather changes. Pack layers, rain gear, and warm clothes for early morning drives."
  }
];

// Trust indicators data
const trustIndicators = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Award Winning",
    description: "Top rated safari operator for 5 consecutive years"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fully Licensed",
    description: "Licensed by Kenya Tourism Board & KATO certified"
  },
  {
    icon: <UsersIcon className="w-6 h-6" />,
    title: "Expert Guides",
    description: "Experienced local guides with 10+ years in the field"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "98% Success Rate",
    description: "Big Five sightings guaranteed or money back"
  }
];

// Conservation insights for day-by-day tab
const conservationInsights = [
  {
    icon: <TreePine className="w-5 h-5" />,
    title: "Conservation Impact",
    content: "Your safari directly supports wildlife conservation and local communities. We partner with conservation organizations to protect endangered species."
  },
  {
    icon: <UsersIcon className="w-5 h-5" />,
    title: "Community Support",
    content: "Safari tourism provides sustainable livelihoods for local communities, reducing human-wildlife conflict and promoting conservation."
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Eco-Friendly Practices",
    content: "We use eco-friendly vehicles, support carbon offset programs, and partner with lodges committed to sustainable tourism."
  }
];

// Wildlife behavior insights for day-by-day
const wildlifeBehaviorTips = [
  {
    title: "Big Cat Behavior",
    tip: "Lions are most active during cooler parts of the day. Look for them resting under acacia trees during midday heat.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Elephant Communication",
    tip: "Elephants communicate through infrasound - low-frequency calls you can't hear but can sometimes feel as vibrations.",
    icon: <Mountain className="w-5 h-5" />
  },
  {
    title: "Migration Patterns",
    tip: "Wildebeest follow ancient migration routes guided by rainfall patterns and grass availability, not calendar dates.",
    icon: <Compass className="w-5 h-5" />
  },
  {
    title: "Bird Watching",
    tip: "East Africa hosts over 1,000 bird species. Early morning hours offer the best birding opportunities.",
    icon: <Bird className="w-5 h-5" />
  }
];

// Enhanced function to get abundance color and label with VIBRANT COLORS
const getAbundanceInfo = (abundance) => {
  const normalizedAbundance = abundance?.toLowerCase() || 'none';
  
  const abundanceMap = {
    'abundant': { 
      color: 'bg-emerald-500', 
      label: 'Abundant', 
      textColor: 'text-emerald-300', 
      priority: 5,
      bgClass: 'bg-emerald-500/10 border-emerald-500/30',
      ringColor: 'ring-emerald-400/50'
    },
    'common': { 
      color: 'bg-blue-500', 
      label: 'Common', 
      textColor: 'text-blue-300', 
      priority: 4,
      bgClass: 'bg-blue-500/10 border-blue-500/30',
      ringColor: 'ring-blue-400/50'
    },
    'occasional': { 
      color: 'bg-amber-500', 
      label: 'Occasional', 
      textColor: 'text-amber-300', 
      priority: 3,
      bgClass: 'bg-amber-500/10 border-amber-500/30',
      ringColor: 'ring-amber-400/50'
    },
    'rare': { 
      color: 'bg-red-500', 
      label: 'Rare', 
      textColor: 'text-red-300', 
      priority: 2,
      bgClass: 'bg-red-500/10 border-red-500/30',
      ringColor: 'ring-red-400/50'
    },
    'rare to none': { 
      color: 'bg-red-500', 
      label: 'Rare', 
      textColor: 'text-red-300', 
      priority: 2,
      bgClass: 'bg-red-500/10 border-red-500/30',
      ringColor: 'ring-red-400/50'
    },
    'very rare': { 
      color: 'bg-purple-500', 
      label: 'Very Rare', 
      textColor: 'text-purple-300', 
      priority: 1,
      bgClass: 'bg-purple-500/10 border-purple-500/30',
      ringColor: 'ring-purple-400/50'
    },
    'very-rare': { 
      color: 'bg-purple-500', 
      label: 'Very Rare', 
      textColor: 'text-purple-300', 
      priority: 1,
      bgClass: 'bg-purple-500/10 border-purple-500/30',
      ringColor: 'ring-purple-400/50'
    },
    'none': { 
      color: 'bg-gray-500', 
      label: 'None', 
      textColor: 'text-gray-400', 
      priority: 0,
      bgClass: 'bg-gray-500/10 border-gray-500/30',
      ringColor: 'ring-gray-400/50'
    }
  };
  return abundanceMap[normalizedAbundance] || abundanceMap['none'];
};

// Function to sort wildlife by abundance level (highest to lowest)
const sortWildlifeByAbundance = (wildlife) => {
  if (!Array.isArray(wildlife)) return [];
  
  return [...wildlife].sort((a, b) => {
    const aInfo = getAbundanceInfo(a?.abundance);
    const bInfo = getAbundanceInfo(b?.abundance);
    return bInfo.priority - aInfo.priority;
  });
};

// Function to get night badge color
const getNightBadgeColor = (nights) => {
  if (nights === 0) return 'bg-gray-500/80 text-gray-200';
  if (nights === 1) return 'bg-slate-600/80 text-slate-200';
  if (nights === 2) return 'bg-slate-600/80 text-slate-200';
  if (nights === 3) return 'bg-slate-600/80 text-slate-200';
  return 'bg-slate-600/80 text-slate-200';
};

// ========================================
// CENTRALIZED TOURS DATA WITH OVERVIEW AND INCLUSIONS
// ========================================
const allToursData = [
  {
    id: 'custom-trip',
    title: 'Create Your Custom Safari',
    location: 'East Africa & Beyond',
    duration: 'Flexible',
    pricePerPerson: 0, 
    rating: 0,
    reviews: 0,
    description: "Dreaming of a unique African adventure? Let our experts craft a personalized safari tailored to your interests, budget, and travel style. From specific wildlife encounters to unique cultural experiences, we'll design your perfect journey.",
    image: 'Tailor-made safari planning session with maps and notes in a cozy setting',
    tags: ['custom', 'tailor-made', 'personalized', 'luxury', 'adventure'],
    bestMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    budgetPlaceholder: 5000,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: "Dreaming of a unique African adventure tailored exactly to your desires? Let us craft the perfect custom safari for you. Whether it's specific parks, unique activities, a particular pace, or special occasions, our experts are here to bring your vision to life. Tell us your travel dreams, and we'll handle the rest!",
      tourFeatures: [
        {
          icon: <Wand2 className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Fully Customized",
          description: "Every aspect designed around your specific interests, budget, and travel preferences."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Expert Consultation",
          description: "Work directly with our safari specialists to craft your perfect itinerary."
        },
        {
          icon: <Globe className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Flexible Destinations",
          description: "Choose from any combination of East African destinations and beyond."
        },
        {
          icon: <Calendar className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Your Schedule",
          description: "Travel dates, duration, and pace completely flexible to your needs."
        },
        {
          icon: <Crown className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury to Adventure",
          description: "From ultra-luxury to authentic camping - we match your style perfectly."
        },
        {
          icon: <Heart className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Special Occasions",
          description: "Honeymoons, anniversaries, birthdays - we make your celebration unforgettable."
        }
      ],
      activitiesTransportation: {
        activities: "Tailored to your interests - game drives, walking safaris, cultural visits, hot air balloon rides, and more",
        gameVehicle: "Choice of vehicle based on your preferences and destinations",
        transportation: "Customized transport plan including flights, transfers, and ground transport as needed",
        airportTransfer: "Included as per your custom itinerary"
      }
    },

    // INCLUSIONS CONTENT - Not applicable for custom trips
    inclusionsContent: null,

    gettingThere: {
      startLocation: "Your Choice",
      startAirport: "Flexible based on your custom itinerary",
      endLocation: "Your Choice", 
      endAirport: "Flexible based on your custom itinerary",
      airportTransfer: "Included based on your custom itinerary",
      internationalFlights: "We can help you find the best flight deals for your custom destinations",
      additionalAccommodation: "Pre and post-tour accommodation can be arranged anywhere"
    },
    itinerary: [
      { day: 1, location: 'Your Imagination', nights: 'Flexible', activity: 'Share your dream destinations, preferred activities, travel style, and budget with us. The more details, the better!', image: 'Collage of diverse African landscapes and wildlife like lions, elephants, giraffes' },
      { day: '...', location: 'Expert Consultation', nights: 'Flexible', activity: 'Our safari specialists will connect with you to refine your ideas, offer expert advice, and suggest hidden gems based on your interests.', image: 'Safari expert discussing itinerary with clients over a detailed map of Africa' },
      { day: '...', location: 'Personalized Itinerary Crafting', nights: 'Flexible', activity: 'We will design a day-by-day itinerary complete with handpicked accommodations, exclusive experiences, and seamless logistics, all tailored to you.', image: 'Beautifully designed custom safari itinerary document with photos and descriptions' },
      { day: '...', location: 'Your Unforgettable Safari', nights: 'Flexible', activity: 'Embark on your one-of-a-kind journey, knowing every detail has been thoughtfully arranged for an extraordinary African experience.', image: 'Happy travelers on a custom safari adventure with stunning African sunset backdrop' }
    ],
    whatToExpect: [
      'A completely personalized travel plan built around your interests, budget, and schedule.',
      'Expert advice and insider knowledge from seasoned safari planners.',
      'Access to unique experiences and off-the-beaten-path destinations.',
      'Flexible dates and trip duration.',
      'Handpicked accommodations that match your style, from luxury lodges to adventurous camping.',
      'Dedicated support throughout the planning process and during your travels.',
      'An unforgettable journey designed just for you.'
    ],
    nextTrip: 'kenya-classic',
    prevTrip: null, 
    isCustom: true,
    suggestedTrips: []
  },
  {
    id: '7-Day-Kenyan-Luxury-Safari',
    title: '7-Day Kenyan Luxury Safari',
    location: 'Kenya',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 3200,
    rating: 5,
    reviews: 438,
    description: "Experience the best of Kenya in just 7 days! From the vibrant wildlife of Nairobi to the iconic elephants of Amboseli set against the majestic Mount Kilimanjaro, marvel at the pink flamingos of Lake Nakuru and explore the raw beauty of the legendary Masai Mara. This unforgettable Kenya safari adventure offers stunning landscapes, thrilling game drives, and up-close encounters with Africa's most captivating wildlife.",
    image: 'Elephants walking majestically in front of Mount Kilimanjaro Amboseli National Park Kenya',
    tags: ['kenya', 'big five', 'family', 'luxury', 'migration (seasonal)'],
    bestMonths: ['Jan', 'Feb', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 3200,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: "Experience the best of Kenya in just 7 days! From the vibrant wildlife of Nairobi to the iconic elephants of Amboseli set against the majestic Mount Kilimanjaro, marvel at the pink flamingos of Lake Nakuru and explore the raw beauty of the legendary Masai Mara. This unforgettable Kenya safari adventure offers stunning landscapes, thrilling game drives, and up-close encounters with Africa's most captivating wildlife.",
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury tour",
          description: "This luxury tour uses premium lodges and tented camps with exceptional service and amenities."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request minor changes to the accommodations and destinations of this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you and won't be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour with single supplement options available."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for all ages",
          description: "This tour is suitable for children of all ages with family-friendly accommodations."
        }
      ],
      activitiesTransportation: {
        activities: "Game drives in 4x4 safari vehicles, cultural visits, and guided nature walks",
        gameVehicle: "Pop-up roof 4x4 vehicle ",
        transportation: "Private 4x4 safari vehicle with professional driver-guide throughout the tour",
        airportTransfer: "Complimentary transfer from and back to Jomo Kenyatta International Airport included"
      }
    },

    // INCLUSIONS CONTENT
    inclusionsContent: {
      included: [
        { title: "All national park fees", subtitle: "(For non-residents as per Kenya Wildlife Service rates)" },
        { title: "All game drives and activities", subtitle: "(Unless labeled as optional in itinerary)" },
        { title: "All accommodation", subtitle: "(As specified in day-by-day itinerary)" },
        { title: "Professional driver/guide", subtitle: "English-speaking with extensive wildlife knowledge" },
        { title: "All transportation", subtitle: "Private 4x4 safari vehicle with pop-up roof" },
        { title: "All Taxes/VAT", subtitle: "Government taxes and service charges included" },
        { title: "Airport transfers", subtitle: "Pick-up and drop-off at Jomo Kenyatta International Airport" },
        { title: "Meals as specified", subtitle: "All meals as detailed in the day-by-day section" },
        { title: "Bottled water", subtitle: "Complimentary bottled water during game drives" },
      
      ],
      excluded: [
        { title: "International flights", subtitle: "(From/to your home country)" },
        { title: "Additional accommodation", subtitle: "Before and after tour dates (can be arranged)" },
        { title: "Tips and gratuities", subtitle: "(Recommended US$15-20 per person per day)" },
        { title: "Personal items", subtitle: "(Souvenirs, travel insurance, visa fees, etc.)" },
        { title: "Alcoholic beverages", subtitle: "(Available for purchase at lodges)" },
        { title: "Optional activities", subtitle: "(Hot air balloon safari, cultural village visits)" },
        { title: "Laundry services", subtitle: "(Available at lodges for additional cost)" },
        { title: "Government tax increases", subtitle: "Any increases in government taxes or park fees after booking" },
        { title: "Emergency evacuation insurance", subtitle: "AMREF Flying Doctors coverage included" }
      ]
    },

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta International Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta International Airport (NBO)",
      airportTransfer: "Complimentary transfer from and back to the airport is included",
      internationalFlights: "Book your own international flights - we can help you find the best deals if needed",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost in Nairobi"
    },
    itinerary: [
       { 
    day: 1, 
    location: 'Nairobi to Amboseli National Park', 
    mainDestination: 'Amboseli National Park',
    nights: 1, 
    hotel: 'Ol Tukai Lodge',
    activity: `You will be collected at Jomo Kenyatta International Airport (NBO). Accomodation before the tour starts can be arranged for an extra cost.
    After breakfast and assisted check-out at your hotel in Nairobi, you will enjoy a scenic drive to Amboseli. Amboseli is known for its 
    stunning views of Mount Kilimanjaro, the highest peak in Africa. The park offers one of the best vantage points to see the snow-capped 
    summit of Kilimanjaro, particularly at sunrise and sunset. You will arrive at Oltukai Lodge in time for check-in, lunch and relaxation.
    Enjoy an evening game drive in the park and return for dinner and overnight at the Lodge.`, 
    image: `Nairobi city skyline view with a giraffe in the foreground at Giraffe Manor` 
  },
  {
    day: '2',
    location: 'Full Day Game Drive in Amboseli National Park',
    mainDestination: 'Amboseli National Park',
    nights: 1,
    hotel: 'Ol Tukai Lodge',
    activity: 'Enjoy an early breakfast before heading out for a full-day game drive in Amboseli National Park. During the drive, you will have the chance to spot a variety of wildlife, including large herds of elephants, lions, cheetahs, giraffes, zebras, buffalo, and numerous bird species — all set against the breathtaking backdrop of Mount Kilimanjaro. A picnic lunch will be enjoyed within the park, surrounded by nature. In the evening, return to the lodge to relax and unwind after an exciting day of exploration.',
    image: 'Elephants grazing with Mount Kilimanjaro in the background Amboseli Kenya'
  },
  {
    day: '3',
    location: 'Drive from Amboseli to Lake Naivasha',
    mainDestination: 'Lake Naivasha',
    nights: 1,
    hotel: 'Lake Naivasha Sopa Resort',
    activity: `Have an early morning assisted check-out, followed by a scenic drive to Lake Naivasha with a stop at the Great Rift Valley viewpoint for beautiful panoramic views. On arrival, check in at Lake Naivasha Sopa Resort for lunch. In the afternoon, enjoy a peaceful boat ride on Lake Naivasha, where you can spot hippos, various water birds, and stunning views of the surrounding landscape. The boat ride will take you to Crescent Island, a private sanctuary home to giraffes, zebras, impalas, waterbucks, and a variety of bird species. The island is perfect for guided walking safaris, allowing you to get up close to the wildlife in a safe, open environment.`,
    image: 'Boats on Lake Naivasha with surrounding acacia trees'
  },
  {
    day: '4',
    location: 'Lake Naivasha to Lake Nakuru National Park',
    mainDestination: 'Lake Nakuru National Park',
    nights: 1,
    hotel: 'Sarova Lion Hill Game Lodge',
    activity: `Have an early morning assisted check-out followed by a scenic drive to Lake Nakuru National Park. The park is most famous (and rightly so) for how easy it is to see black and white rhinos, as well as the populations of lions (including some that, unusually, like to climb trees) and endangered Rothschild's giraffes. You also have a chance to see flamingos, leopards and plenty of birds. You might fall in love with the combination of lake, acacia forest and dramatic escarpment. You'll go on a guided game drive in Lake Nakuru National Park. With an expert guide and in a safari vehicle, you'll search for rhinos, lions and flamingos. Later on, you will return to the lodge for dinner and an overnight stay.`,
    image: 'Flamingos wading in the shallow waters of Lake Nakuru National Park Kenya'
  },
  {
    day: '5',
    location: 'Lake Nakuru NP to Masai Mara National Reserve',
    mainDestination: 'Masai Mara National Reserve',
    nights: 1,
    hotel: 'Sarova Mara Game Camp',
    activity: `After breakfast, depart for the Masai Mara National Reserve, traveling via Narok, the largest town and gateway to the Mara region. Upon arrival, check in at Sarova Mara Game Camp, enjoy a delicious lunch, and take some time to relax.

Later in the afternoon, embark on your first exciting game drive in the Masai Mara. This world-renowned reserve is famous for its vast savannah plains teeming with wildlife, including the Big Five - lions, leopards, elephants, buffalo, and rhinos - as well as cheetahs, zebras, giraffes, hyenas, and countless antelope species. The Mara is also home to the spectacular Great Wildebeest Migration, one of nature's most incredible events.

After the game drive, return to the camp for dinner and an overnight stay, surrounded by the beauty and sounds of the African wilderness.`,
    image: 'Hot air balloon safari over the Masai Mara at dawn'
  },
  {
    day: '6',
    location: 'Full Day Game Drive in Masai Mara NR',
    mainDestination: 'Masai Mara National Reserve',
    nights: 0,
    hotel: 'Sarova Mara Game Camp',
    activity: `Start your day with an early breakfast before heading out for a full-day game drive in the Masai Mara, with a picnic lunch in the park. Optional activities include an early morning balloon safari and a visit to a Maasai village to experience their culture and traditions.

The Masai Mara is renowned for the Great Wildebeest Migration, the Big Five, and other wildlife such as cheetahs, impalas, and elands. You'll also see the famous Mara River, home to crocodiles and hippos. In the evening, return to the camp for dinner, relaxation, and an overnight stay.`,
    image: 'Nairobi city skyline view'
  },
    {
    day: '7',
    location: 'Drive Back to Nairobi',
    mainDestination: 'Nairobi',
    nights: 0,
    hotel: null,
    activity: `After checking out from Sarova Mara Game Camp, you will begin your journey back to Nairobi, where you will be dropped off at your preferred location.`,
    image: 'Nairobi city skyline view'
  }
    ],
    whatToExpect: [
      'Close encounters with the "Big Five" (Lion, Leopard, Elephant, Rhino, Buffalo).',
      'Breathtaking landscapes, from open savannas to volcanic mountains.',
      'Stays in carefully selected lodges and tented camps offering comfort and immersion in nature.',
      'Knowledgeable and experienced local safari guides.',
      'Opportunities for cultural interaction with the Maasai people.',
      'Delicious meals, including bush breakfasts and sundowner cocktails.',
      'Early morning and late afternoon game drives for optimal wildlife viewing.',
     
    ],
    nextTrip: 'tanzania-great-migration',
    prevTrip: 'custom-trip', 
    suggestedTrips: [
      { id: 'tanzania-great-migration', title: 'Tanzania Great Migration', duration: '8 Days', image: 'Wildebeest migration crossing Mara River in Serengeti Tanzania', pricePerPerson: 4700, location: 'Tanzania' },
      { id: 'uganda-gorilla-trek', title: 'Uganda Gorilla & Wildlife Trek', duration: '7 Days', image: 'Close-up portrait of a silverback mountain gorilla in Bwindi Forest Uganda', pricePerPerson: 4200, location: 'Uganda' }
    ]
  },
  {
    id: 'tanzania-great-migration',
    title: '7-Day Journey of the Wildebeest',
    location: 'Tanzania',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 4920,
    rating: 5.0,
    reviews: 438,
    description: "Witness the awe-inspiring Great Wildebeest Migration in the Serengeti, explore the Ngorongoro Crater, and discover Tarangire's elephant herds.",
    image: 'Massive herd of wildebeest migrating across the Serengeti plains Tanzania',
    tags: ['tanzania', 'migration', 'wildlife', 'luxury', 'crater'],
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    budgetPlaceholder: 4500,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This is a very special tour that concentrates in the Serengeti, to follow the great migration. You will spend at least 4 nights in the park, usually two in the Central Area (largest concentration of big cats) and two where the migration is according to the time of the year. We have designed this particular tour so that you finish the safari in the most remote location in the Serengeti, and then fly from there to your next destination. But we can redesign it to return to Arusha by land.`,
      tourFeatures: [
         {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury tour",
          description: "This luxury tour uses premium lodges and tented camps with exceptional service and amenities."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request minor changes to the accommodations and destinations of this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you and won't be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour with single supplement options available."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for all ages",
          description: "This tour is suitable for children of all ages with family-friendly accommodations."
        }
      ],
      activitiesTransportation: {
        activities: "Game drives, crater exploration, migration tracking, cultural visits (optional), and bush walks where permitted",
        gameVehicle: "4x4 safari vehicle with pop-up roof",
        transportation: "Private safari vehicle throughout, with optional light aircraft flights",
        airportTransfer: "Airport transfers included from Kilimanjaro or Arusha Airport"
      }
    },

    // INCLUSIONS CONTENT
    inclusionsContent: {
      included: [
        { title: "All national park fees", subtitle: "(Serengeti, Ngorongoro, Lake Manyara/Tarangire)" },
        { title: "Ngorongoro Crater fees", subtitle: "(Including crater descent and vehicle fees)" },
        { title: "All game drives", subtitle: "(Multiple daily game drives with flexible timing)" },
        { title: "Professional guide", subtitle: "Expert driver-guide with extensive Serengeti knowledge" },
        { title: "All accommodation", subtitle: "(Luxury lodges and tented camps as specified)" },
        { title: "All transportation", subtitle: "(4x4 safari vehicle with pop-up roof)" },
        { title: "Airport transfers", subtitle: "(Kilimanjaro/Arusha airport pick-up and drop-off)" },
        { title: "All meals", subtitle: "(Breakfast, lunch, and dinner as per itinerary)" },
        { title: "Bottled water", subtitle: "(During game drives and transfers)" },
       
      ],
      excluded: [
        { title: "International flights", subtitle: "(To/from Tanzania - we can assist with booking)" },
        { title: "Tanzania visa fees", subtitle: "(US$50 for most nationalities)" },
        { title: "Tips for guide and staff", subtitle: "(US$20-25 per person per day recommended)" },
        { title: "Optional activities", subtitle: "(Hot air balloon safari US$600, cultural visits)" },
        { title: "Personal expenses", subtitle: "(Laundry, telephone, souvenirs, etc.)" },
        { title: "Travel insurance", subtitle: "(Highly recommended for international travel)" },
        { title: "Alcoholic beverages", subtitle: "(Available for purchase at accommodations)" },
        { title: "Additional nights", subtitle: "(Pre/post safari accommodation in Arusha)" }
      ]
    },

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro International Airport (JRO) ",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "Airport transfer included from Kilimanjaro International Airport to Arusha and back",
      internationalFlights: "International flights not included - we recommend booking through Kilimanjaro International Airport",
      additionalAccommodation: "Pre and post-safari accommodation in Arusha can be arranged for an additional cost"
    },
    itinerary: [
        { day: 1, location: 'Lake Manyara National Park', nights: 1, hotel: 'Lake Manyara Kilimamoja Lodge', activity: `You'll be picked up from your hotel at 8 am and start a beautiful journey across the Great Rift Valley for a full-day game drive. Although small in dimension (205 sq miles), the park has breathtaking scenery and is well famous for its lush acacia forest, giant figs and mahogany trees, as well as to a growing population of baboons and blue monkeys. Permanent residents of this park also include giraffes, elephants, impalas and a huge amount of buffaloes. The lake is also home to a large number of hippos. The game drives along the lake provide stunning photo opportunities of giraffes and buffaloes in the foreground and the lake in the background. Some extra tours are possible, including a bike tour or a boat excursion. In the afternoon, you'll return to the camp for dinner.

There is the possibility to downgrade or upgrade your accommodation level.

NOTE: You can replace this park with Tarangire NP or add an extra day and visit both.`, image: 'Lush coffee plantation lodge near Arusha with Mount Meru view', mainDestination: 'Lake Manyara National Park' },
        { day: 2, location: 'Ngorongoro Crater', nights: 1, hotel: 'Ngorongoro Serena Safari Lodge', activity: `Ngorongoro Crater is considered one of the Wonders of the Natural World. The crater spreads for 102 sq miles and has 2,000 ft high walls, making it virtually Noah's ark and inhabiting almost every species of wildlife that is indigenous to East Africa. It's one of the very rare locations in the whole continent where you can witness the black rhino. The crater has a river, several swamps, a soda lake with a great concentration of flamingos, a forest and open plains. It's also famous for its elephants which are the largest in the world and have huge tusks. Ngorongoro Crater is truly a Wonder of the Natural World.

We will start the day very early with a transfer to Ngorongoro Conservation Area. We will descend into the crater floor for an incredible morning of wildlife in one of the most stunning places on earth. After a fantastic afternoon game drive, ascend the crater and transfer to your accommodation.

There is the possibility to downgrade or upgrade your accommodation level.`, image: 'Elephants gathered around giant baobab trees in Tarangire National Park', mainDestination: 'Ngorongoro Crater' },
        { day: '3', location: 'Serengeti National Park (Central/North)', nights: 1, hotel: 'Serengeti Serena Safari Lodge', activity: `After an early breakfast, depart towards the most famous National park in the World, the Serengeti. The driving itself, although long, is spectacular. This will be an unforgettable moment for anyone seeing it for the first time. As you progress well into the Serengeti, you will see why the name means, in the local language, "endless plains". The park has 6,900 sq miles (18,000 sq km) and for most of it, the plains will stretch to the horizon defying your senses and perception of distances. It is the home of the Great Migration and to 2 million wildebeests, hundreds of thousands of zebras and all kinds of antelopes. As for big cats and large predators, it's the place of choice to look out for lions, cheetahs, leopards, hyenas, with many television scenes like the famous River Crossings having been filmed in this park.

There is the possibility to downgrade or upgrade your accommodation level.`, image: 'Cheetah intently scanning the vast plains of Serengeti National Park', mainDestination: 'Central Serengeti National Park' },
        { day: 4, location: 'Serengeti National park (Central)', nights: 1, hotel: 'Serengeti Serena Safari Lodge', activity: `You'll have a full day in the Serengeti National Park. We are completely flexible with your preferences and this day will be organized according to your wishes. On every day of the safari, your guide will discuss with you the best timings for you, including the game drives and the wake-up time. For example, on this day, you could do a morning game drive, return to the camp for lunch and relaxation and finish with an afternoon game drive. Alternatively, you could do a full-day game drive with a picnic lunch.`, image: 'Panoramic view into the Ngorongoro Crater teeming with wildlife', mainDestination: 'Central Serengeti National Park' },
        { day: '5-6', location: 'Serengeti National Park', nights: 2, hotel: 'Serengeti Migration Camp', activity: `On these two incredible days, you will be driven across remote locations within the vast Serengeti plains in pursue of the Great Migration. The areas you visit depend on the time of the year and could be as far as the remote North of the Serengeti near the border with Kenya, or could be in the South (Ndutu Area) or even in the Western part of the park.`, image: 'Famous tree-climbing lions lounging in Lake Manyara National Park', mainDestination: 'Central Serengeti National Park' },
        { day: 7, location: 'Flying Out of The Serengeti', nights: 0, hotel: null, activity: `On this day, we suggest a very early wake-up in order to do an early morning game drive (when the animals are more active) and see one of the best sunrises you'll ever witness. It's really one of the most beautiful experiences to have. After the game drive, we will return to the camp for a rewarding brunch. Afterward, we'll proceed to the airstrip for your flight back to Arusha, or whatever your next amazing destination might be (i.e. Zanzibar). Alternatively, instead of this early morning game drive, you may choose to stay at the camp for a bit of relaxation.`, image: 'Safari vehicle driving towards a dramatic sunset in Tanzania', mainDestination: 'Central Serengeti National Park' },
    ],
    whatToExpected: [
      'The chance to witness the Great Wildebeest Migration (timing dependent).',
      'Exceptional Big Five sightings in Serengeti and Ngorongoro Crater.', 
      'Accommodation in premium lodges and tented camps with spectacular views.',
      'Cultural visits to local villages (optional).',
      'Expert driver-guides providing insights into wildlife and ecology.',
      'Stunning photographic opportunities at every turn.'
    ],
    nextTrip: 'uganda-gorilla-trek',
    prevTrip: 'kenya-classic',
    suggestedTrips: [
      { id: 'kenya-classic', title: 'Kenya Classic Safari', duration: '10 Days', image: 'Elephants with Mount Kilimanjaro background in Amboseli Kenya', pricePerPerson: 2950, location: 'Kenya' },
      { id: 'rwanda-primates-volcanoes', title: 'Rwanda Primates & Volcanoes', duration: '9 Days', image: 'Golden monkey perched on a bamboo branch in Volcanoes NP Rwanda', pricePerPerson: 4800, location: 'Rwanda' }
    ]
  },
  {
    id: 'Uganda-Ultimate-Luxury-Safari',
    title: '10-Day Uganda Ultimate Luxury Safari',
    location: 'Uganda',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 7200,
    rating: 4.9,
    reviews: 388,
    description: "Experience the thrill of tracking wildlife on foot in South Luangwa National Park, the birthplace of walking safaris. Intimate encounters and expert guides.",
    image: 'Group on a walking safari in South Luangwa National Park Zambia with armed ranger',
    tags: ['uganda', 'walking safari', 'adventure', 'wildlife', 'off-beat'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 7200,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: "The ultimate luxury safari tour package is available in Uganda, the Pearl of Africa. In the top-rated national parks of Uganda, you can see the Big Five, gorillas, chimpanzees, impalas, and zebras. The trip includes Murchison Falls, Kibale Forest, Bwindi Impenetrable National Park, Queen Elizabeth and Lake Mburo.",
      tourFeatures: [
         {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury tour",
          description: "This luxury tour uses premium lodges and tented camps with exceptional service and amenities."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request minor changes to the accommodations and destinations of this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you and won't be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour with single supplement options available."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 15 years",
          description: "The minimum age for this tour is 15 years."
        }
      ],
      activitiesTransportation: {
        activities: "Gorilla trekking, chimpanzee tracking, game drives, boat cruises, cultural visits, and nature walks",
        gameVehicle: "4x4 safari vehicle with pop-up roof and professional driver-guide",
        transportation: "Private safari vehicle throughout with optional domestic flights",
        airportTransfer: "Airport transfers included from Entebbe International Airport"
      }
    },

    // INCLUSIONS CONTENT
    inclusionsContent: {
      included: [
        { title: "Gorilla trekking permits", subtitle: "(US$800 per person - included in tour price)" },
        { title: "Chimpanzee tracking permits", subtitle: "(Kibale Forest National Park permits included)" },
        { title: "All national park fees", subtitle: "(Murchison Falls, Queen Elizabeth, Bwindi, Lake Mburo)" },
        { title: "All accommodation", subtitle: "(Luxury lodges and camps as specified)" },
        { title: "All meals", subtitle: "(Breakfast, lunch, and dinner throughout)" },
        { title: "Professional guide", subtitle: "(English-speaking driver-guide with primate expertise)" },
        { title: "4x4 safari vehicle", subtitle: "(Private vehicle with pop-up roof)" },
        { title: "Airport transfers", subtitle: "(Entebbe International Airport transfers)" },
        { title: "Bottled water", subtitle: "(During all activities and transfers)" },
        { title: "Emergency insurance", subtitle: "(Flying Doctors evacuation coverage)" }
      ],
      excluded: [
        { title: "International flights", subtitle: "(To/from Uganda via Entebbe International Airport)" },
        { title: "Uganda visa", subtitle: "(US$50 for most nationalities, e-visa available)" },
        { title: "Tips for guides and staff", subtitle: "(US$25-30 per person per day recommended)" },
        { title: "Optional activities", subtitle: "(Rhino tracking US$45, boat cruises, cultural visits)" },
        { title: "Alcoholic beverages", subtitle: "(Available for purchase at lodges)" },
        { title: "Personal expenses", subtitle: "(Laundry, souvenirs, telephone calls)" },
        { title: "Travel insurance", subtitle: "(Comprehensive travel insurance highly recommended)" },
        { title: "Additional accommodation", subtitle: "(Extra nights in Entebbe/Kampala)" }
      ]
    },

    gettingThere: {
      startLocation: "Entebbe",
      startAirport: "Entebbe Airport",
      endLocation: "Entebbe", 
      endAirport: "Entebbe",
      airportTransfer: "Airport transfers included from Entebbe Airport to lodges and back",
      internationalFlights: "International flights to Entebbe not included - we can assist with booking the best routes",
      additionalAccommodation: "Pre and post-safari accommodation in Entebbe can be arranged at additional cost"
    },
    itinerary: [
        { day: 1, location: 'To Murchison Falls National Park', nights: 1, hotel: 'Paraa Safari Lodge', activity: `After an early breakfast, you will set off for Murchison Falls National Park. Along Masindi road, you will stop at Ziwa Rhino Sanctuary to visit the reintroduced white rhino. Here, you will enjoy lunch, then proceed to Murchison. Murchison Falls ranks among Africa's finest. Upon arrival in the late afternoon, you will conduct a short game drive.`, 
              image: 'Sunset over the Luangwa River in Zambia', mainDestination: 'Murchison Falls National Park' },
        { day: 2, location: 'In Murchison Falls National Park', nights: 1, hotel: 'Paraa Safari Lodge', activity: `The day will be spent on game drives. You will leave early in the morning and go on a game drive from 8 am to 12 pm. You will see several animals including lions, elephants, leopards and giraffes. In the afternoon (2 to 5 pm), you will go on an impressive launch trip on the Nile up to the falls. This gives you the chance to see hippos, crocodiles, buffaloes, elephants and many different bird species.`, image: 'Leopard resting on a sausage tree branch in South Luangwa', mainDestination: 'Murchison Falls National Park' },
        { day: 3, location: 'To Kibale National Park', nights: 1, hotel: 'Chimpundu Lodge', activity: `You will have an early morning game drive in Murchison Falls as you depart for Kibale Forest. You will pass close to Lake Albert. On a clear day, the view from the top of the Albert Rift is spectacular. In the afternoon, you will arrive at Kibale Forest, where you will fall asleep to the sounds of the tropical rainforest.`, image: 'Rustic yet comfortable bush camp tent under starry Zambian sky', mainDestination: 'Kibale National Park' },
        { day: 4, location: 'Chimp, Community and Swamp Walk', nights: 1, hotel: 'Chimpundu Lodge', activity: `At 8 am, you will start the 4-hour chimp walk after a pre-briefing. In addition, 10 other primates can be seen. The park is also known for its variety of butterflies and birds. In the afternoon, you will take a walk through the Bigodi community and Swamp (physical fitness is encouraged).`, image: 'Colorful textiles at a local craft market near Mfuwe Zambia', mainDestination: 'Kibale National Park' },
        { day: 5, location: 'To Queen Elizabeth National Park', nights: 1, hotel: 'Mweya Safari Lodge', activity: `You will depart early for Queen Elizabeth National Park via Fort Portal. You'll reach Mweya Safari Lodge in Queen Elizabeth NP at midday, where you have a stunning view over the Kazinga Channel. In the late afternoon, you will go on a game drive to look for the Big Five animals.`, image: 'Small aircraft on a dusty airstrip in the African bush', mainDestination: 'Queen Elizabeth National Park' },
        { day: 6, location: 'In Queen Elizabeth National Park', nights: 1, hotel: 'Mweya Safari Lodge', activity: `This day is for a game drive on the plains of Queen Elizabeth. It is home to thousands of Ugandan kobs, lions, elephants, buffalos, hippos, tree-climbing lions, etc. Also on the program is a 2-hour launch trip on the Kazinga Channel, where we will see all the animals from the waterside.`, image: 'Small aircraft on a dusty airstrip in the African bush', mainDestination: 'Queen Elizabeth National Park' },
        { day: 7, location: 'To Bwindi Impenetrable National Park', nights: 1, hotel: 'Mahogany Springs Lodge', activity: `In the morning, we leave for the south of Bwindi. For people who like to walk, the first 14km is a stunning, beautiful walk along the lakeshore and hills. We pass mountains, hills and lakes with cultivated terraces, tropical rainforests and bamboo forests.`, image: 'Small aircraft on a dusty airstrip in the African bush', mainDestination: 'Bwindi Impenetrable National Park (Gorillas)' },
        { day: 8, location: 'Gorilla Trekking', nights: 1, hotel: 'Mahogany Springs Lodge', activity: `This is the day for gorilla trekking. At 7:45 am, you will be at the Bwindi Impenetrable Forest office for a pre-briefing, and at 8:30 am, you will start the trek. After finding the gorillas, you will spend a maximum of 1 hour with them. All visitors are expected back at the starting point by 7 pm. Being physically fit is recommended.`, image: 'Small aircraft on a dusty airstrip in the African bush', mainDestination: 'Bwindi Impenetrable National Park (Gorillas)' },
        { day: 9, location: 'To Lake Mburo National Park', nights: 1, hotel: 'Mihingo Lodge', activity: `You will leave early in the morning for Lake Mburo National Park. You will have lunch in the Igongo Cultural Centre in Mbarara before continuing on your trip. Lake Mburo National Park is a smaller but unique park, the only one in the western part of Uganda with impalas and zebras.`, image: 'Small aircraft on a dusty airstrip in the African bush', mainDestination: 'Lake Mburo National Park' },
        { day: 10, location: 'To Entebbe Airport', nights: 0, hotel: null, activity: `You will go for a game walk early in the morning. After a late breakfast, the last part of the journey will bring you back to Kampala or Entebbe Airport. You will stop in Masaka for lunch, then continue with a stopover at the equator for a tea or coffee break and to buy souvenirs.`, image: 'Small aircraft on a dusty airstrip in the African bush', mainDestination: 'Lake Mburo National Park' }

    ],
    whatToExpect: [
      "An unforgettable journey through Uganda's most iconic national parks, blending thrilling game drives, tranquil boat cruises, and intimate wildlife encounters.",
    "High chances of spotting Africa's Big Five—lions, leopards, elephants, buffalo, and rhinos—alongside gorillas, chimpanzees, hippos, crocodiles, and rare bird species.",
    "A once-in-a-lifetime gorilla trekking adventure in Bwindi Impenetrable Forest, offering up-close moments with these gentle giants in their natural habitat.",
    "Guided chimp tracking in Kibale Forest, renowned for its incredible primate diversity and rich tropical rainforest ecosystem.",
    "Scenic drives through rolling hills, crater lakes, lush tea plantations, and dramatic landscapes such as the Albert Rift Valley.",
    "Boat cruises on the Nile and Kazinga Channel, bringing you eye-level with hippos, elephants, crocodiles, and a vibrant array of water birds.",
    "Stays in carefully selected lodges and camps that combine comfort with authentic African character, offering panoramic views and warm hospitality.",
    "Cultural experiences with local communities, including village walks and traditional crafts, for a deeper connection to Uganda's heritage.",
    "Opportunities for unique sightings such as tree-climbing lions, shoebill storks, and the only Ugandan park with impalas and zebras.",
    "A well-paced itinerary with a mix of adventure, relaxation, and scenic exploration—perfect for wildlife enthusiasts, photographers, and nature lovers."
    ],
    nextTrip: 'botswana-delta-chobe',
    prevTrip: 'rwanda-primates-volcanoes',
    suggestedTrips: [
      { id: 'botswana-delta-chobe', title: 'Botswana Delta & Chobe Explorer', duration: '10 Days', image: 'Mokoro canoe gliding through Okavango Delta channels Botswana', pricePerPerson: 5200, location: 'Botswana' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx antelope standing on red sand dunes in Sossusvlei Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: 'rwanda-mountain-gorillas',
    title: '4-Day Rwanda Mountain Gorillas and Golden Monkeys Tour',
    location: 'Rwanda',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 3700,
    rating: 5.0,
    reviews: 538,
    description: "Explore the pristine Okavango Delta by mokoro and boat, then witness the massive elephant herds of Chobe National Park. A journey of contrasts and incredible wildlife.",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 5500,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: "This 4-day trip will make you visit the 2 most attractive tourist activities of Volcanoes National Park which are mountain gorillas and golden monkeys. This trip is suitable for solo travelers, group tours, honeymooners, and family tours. This one will take tourists to the main and the most attractive national park in Rwanda.",
      tourFeatures: [
               {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses lodges. It is a good balance between comfort and affordability."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request minor changes to the accommodations and destinations of this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you and won't be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour with single supplement options available."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 15 years",
          description: "The minimum age for this tour is 15 years."
        }
      ],
      activitiesTransportation: {
        activities: "gorilla trekking",
        gameVehicle: "4x4 safari vehicles for land-based game drives ",

      }
    },

    // INCLUSIONS CONTENT
inclusionsContent: {
  included: [
    { title: "Park fees", subtitle: "(For non-residents)" },
    { title: "Gorilla permits", subtitle: "(One per person, non-resident)" },
    { title: "All activities", subtitle: "(Unless labeled as optional)" },
    { title: "All accommodation", subtitle: "(Unless listed as upgrade)" },
    { title: "A professional driver/guide", subtitle: "" },
    { title: "All transportation", subtitle: "(Unless labeled as optional)" },
    { title: "All Taxes/VAT", subtitle: "" },
    { title: "Roundtrip airport transfer", subtitle: "" },
    { title: "Meals", subtitle: "(As specified in the day-by-day section)" },
    { title: "Drinking water", subtitle: "(On all days)" }
  ],
  excluded: [
    { title: "International flights", subtitle: "(From/to home)" },
    { title: "Additional accommodation", subtitle: "(Before and at the end of the tour)" },
    { title: "Tips", subtitle: "(Tipping guideline US$10.00 pp per day)" },
    { title: "Personal items", subtitle: "(Souvenirs, travel insurance, visa fees, etc.)" },
    { title: "Government imposed increase of taxes and/or park fees", subtitle: "" },
    { title: "Some meals", subtitle: "(As specified in the day-by-day section)" }
  ]
},

    gettingThere: {
      startLocation: "Kigali",
      startAirport: "Kigali International Airport (KGL)",
      endLocation: "Kigali", 
      endAirport: "Kigali International Airport (KGL)",
      airportTransfer: "Airport transfer included from Kigali International Airport to your hotel or residence",
      internationalFlights: "International flights not included ",
      additionalAccommodation: "Additional nights can be arranged at extra cost"
    },
    itinerary: [
      { day: 1, location: 'Pickup, Kigali City Tour and Drive to Volcanoes National Park', nights: 1, hotel: 'Tiloreza Volcanoes Ecolodge', activity: `You'll be collected from the airport.Accommodation before the tour starts can be arranged for an extra cost.A English or French driver guide will come to pick you up from your hotel or residence or at the airport. You'll go on the Kigali city tour where you'll get a chance to visit the Kigali genocide memorial site and Kimironko local market. You'll have lunch and drive to Volcanoes National Park. Then, you'll have dinner and an overnight stay at your lodge.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta', mainDestination: 'Volcanoes National Park (Gorillas)' },
      { day: 2, location: 'Mountain Gorillas Trekking in Volcanoes National Park', nights: 1, hotel: 'Tiloreza Volcanoes Ecolodge', activity: `Early in the morning, our driver-guide will come to pick you up at your lodge and bring you to the park office for a briefing on how to behave when you meet gorillas in nature. You will continue by trekking them in their habitat, enjoying them, and taking as many pictures as you want. After the golden monkey's experience, the driver-guide will drive you back to your booked lodge for lunch, then afternoon relax then wait for Dinner and Overnight stay.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta', mainDestination: 'Volcanoes National Park (Gorillas)' },
      { day: 3, location: 'Golden Monkeys Trekking and Drive Back to the lodge', nights: 1, hotel: 'Tiloreza Volcanoes Ecolodge', activity: `Early in the morning, after your breakfast, with your packed lunch, our driver-guide will come to pick you up from the lodge and then drive you to the park headquarters. You'll get a briefing about how to behave on mountain gorillas when you meet them in the habitat. Then, you'll proceed to trek gorillas. After the remarkable experience with the gorillas, the driver-guide will take you back to your lodge for a hot lunch. Afterward, you will continue with visiting twin lakes which are Bulera and Ruhondo with a driver-guide. Afterward, he will bring you back to your lodge for dinner and an overnight stay.`, image: 'African fish eagle perched on a branch overlooking the Chobe River', mainDestination: 'Volcanoes National Park (Gorillas)' },
      { day: 4, location: 'Breakfast, Check out and drive back to Kigali for Flight', nights: 0, hotel: 'Tiloreza Volcanoes Ecolodge', activity: 'In the morning, after your breakfast, you will check out then our driver guide will come to pick you up and drive you back to Kigali and he/she will drop you off at your hotel/residence or at Airport for your flight back home.', image: 'Large herd of elephants crossing the Chobe River', mainDestination: 'Volcanoes National Park (Gorillas)' },
     
    ],
    whatToExpect: [
  "Pick-up in Kigali from your hotel, residence, or the airport by an English or French-speaking driver-guide.",
  "Guided Kigali city tour including the Genocide Memorial and Kimironko local market.",
  "Scenic drive from Kigali to Volcanoes National Park with beautiful countryside views.",
  "Mountain gorilla trekking adventure with a full briefing from park rangers.",
  "Golden monkey trekking experience in Volcanoes National Park.",
  "Chance to spot other rare wildlife such as elephants and buffalos.",
  "Visit to the scenic twin lakes of Bulera and Ruhondo.",
  "Immersive cultural and nature experience in Rwanda's highlands.",
  "Relaxation and comfort at Tiloreza Volcanoes Ecolodge, a mid-range lodge close to the park.",
  "All meals included during your stay at the lodge, with drinking water provided.",
  "Professional driver-guide throughout the safari ensuring smooth transfers and support.",
  "Final transfer back to Kigali with drop-off at your hotel or airport for departure."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli',
    title: '10-Day Ol Pejeta, Samburu, Nakuru, Mara, Amboseli',
    location: 'Kenya',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 3800,
    rating: 4.8,
    reviews: 185,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 3800,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: "Embark on an unforgettable 10-day safari adventure through Kenya's most iconic wildlife destinations. Your journey begins with a night at Ol Pejeta Conservancy, Samburu 2 nights, Nakuru 1 night, Masai Mara 2 nights, Nakuru 1 night and Amboseli 2 night and that's marks the end of the safari at Nairobi.",
      tourFeatures: [
               {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses lodges and tented camps. It is a good balance between comfort and affordability."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request minor changes to the accommodations and destinations of this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you and won't be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour with single supplement options available."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for all ages",
          description: "This tour is suitable for children of all ages."
        }
      ],
      activitiesTransportation: {
        activities: "game drives, wildlife viewing, cultural visits",
        gameVehicle: "4x4 safari vehicles for game drives ",

      }
    },

    // INCLUSIONS CONTENT
inclusionsContent: {
      included: [
        { title: "All national park fees", subtitle: "(For non-residents as per Kenya Wildlife Service rates)" },
        { title: "All game drives and activities", subtitle: "(Unless labeled as optional in itinerary)" },
        { title: "All accommodation", subtitle: "(As specified in day-by-day itinerary)" },
        { title: "Professional driver/guide", subtitle: "English-speaking with extensive wildlife knowledge" },
        { title: "All transportation", subtitle: "Private 4x4 safari vehicle with pop-up roof" },
        { title: "All Taxes/VAT", subtitle: "Government taxes and service charges included" },
        { title: "Airport transfers", subtitle: "Pick-up and drop-off at Jomo Kenyatta International Airport" },
        { title: "Meals as specified", subtitle: "All meals as detailed in the day-by-day section" },
        { title: "Bottled water", subtitle: "Complimentary bottled water during game drives" },
      
      ],
      excluded: [
        { title: "International flights", subtitle: "(From/to your home country)" },
        { title: "Additional accommodation", subtitle: "Before and after tour dates (can be arranged)" },
        { title: "Tips and gratuities", subtitle: "(Recommended US$15-20 per person per day)" },
        { title: "Personal items", subtitle: "(Souvenirs, travel insurance, visa fees, etc.)" },
        { title: "Alcoholic beverages", subtitle: "(Available for purchase at lodges)" },
        { title: "Optional activities", subtitle: "(Hot air balloon safari, cultural village visits)" },
        { title: "Laundry services", subtitle: "(Available at lodges for additional cost)" },
        { title: "Government tax increases", subtitle: "Any increases in government taxes or park fees after booking" },
        { title: "Emergency evacuation insurance", subtitle: "AMREF Flying Doctors coverage included" }
      ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "Airport transfer included from Nairobi International Airport to your hotel or residence",
      internationalFlights: "International flights not included ",
      additionalAccommodation: "Additional nights can be arranged at extra cost"
    },
    itinerary: [
      { day: 1, location: 'Nairobi to ol Pejeta conservancy', mainDestination: 'Ol Pejeta Conservancy (Laikipia Plateau)', nights: 1, hotel: 'Maisha Sweetwaters Camp', activity: `You'll be collected from the airport.Accommodation before the tour starts can be arranged for an extra cost.After breakfast you will proceed to Samburu Game Reserve. You will arrive in time for lunch and have some time to relax. At 4:00 pm, you'll depart on an afternoon game drive. You will search for the elusive leopard and other wildlife. The highlight of the park is the special Samburu Six. At 6.30 pm, you will return to the camp for dinner and your overnight stay.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Ol Pejeta to Samburu national reserve', mainDestination: 'Samburu National Reserve', nights: 1, hotel: 'Ashnil Samburu Camp', activity: `After breakfast you will proceed to Samburu Game Reserve. You will arrive in time for lunch and have some time to relax. At 4:00 pm, you'll depart on an afternoon game drive. You will search for the elusive leopard and other wildlife. The highlight of the park is the special Samburu Six. At 6.30 pm, you will return to the camp for dinner and your overnight stay.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'More game drives in Samburu national park', mainDestination: 'Samburu National Reserve', nights: 1, hotel: 'Ashnil Samburu Camp', activity: `As Samburu is in a hot region, also known as a semi-arid area, we recommend taking advantage of the mornings and late evening as most animals go into the shade to escape the hot sun. At 6:00 am, you'll depart on an early morning game drive. You will return to the camp for breakfast and relax until mid-afternoon. At 4:00 pm, you'll depart on an afternoon game drive. You'll return at 6:00 pm to the camp for dinner and your overnight stay.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },
      { day: 4, location: 'Samburu reserve to lake Nakuru national park', mainDestination: 'Lake Nakuru National Park', nights: 1, hotel: 'Ziwa Bush Lodge', activity: `After breakfast, you'll head for lake Nakuru national park to arrive in time for lunch. Later in the afternoon after lunch you go for the afternoon game drive at lake Nakuru national park. Enjoying the beautiful scenery along the shores of Lake Nakuru. You'll head back to camp to freshen up, enjoy a freshly prepared dinner, and overnight stay.`, image: 'Large herd of elephants crossing the Chobe River' },
      { day: 5, location: 'Lake Nakuru to Masai Mara National Park', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: 'Jambo Mara Safari Lodge', activity: `You'll have breakfast at the lodge and then head to Hell's Gate National Park. Here, you have a chance for a cycling safari and hiking in the famous gorges of the park.

You will later drive to Masai Mara.

Between July and October, things get busy in the Great Rift Valley. Millions of zebras and wildebeest make the perilous crossing across the Masai Mara in search of new grazing territory. In their wake comes a veritable horde of predators.
You'll arrive in time for lunch and then have time to relax from the drive.

At 5:00 pm, you will be picked up from your hotel by Masai Morans (warriors) who will guide you through a walking safari in the dense Masai Mara as you head later for a cultural tour to some of the old cultures that still exist.

You'll return to lodge/camp for dinner and your overnight stay.`, image: 'Large herd of elephants crossing the Chobe River' },
      { day: 6, location: 'More game drives at masai mara national park', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: 'Jambo Mara Safari Lodge', activity: `Today's itinerary is flexible; you can discuss and arrange this with your guide. You can either have a relaxed breakfast and depart for a full-day game drive around 7:30 am with a picnic lunch. Then, you'll return to the camp late afternoon. Otherwise, you can depart at 6 am on an early morning game drive and return to your accommodation for breakfast, and relax for the rest of the day. You will depart at 4:00 pm on an afternoon game drive and return at 6.30 pm to the camp for dinner and your overnight stay`, image: 'Large herd of elephants crossing the Chobe River' },
      { day: 7, location: 'Masai mara national park to lake naivasha', mainDestination: 'Lake Naivasha', nights: 1, hotel: 'Avian Court Hotel', activity: `After breakfast, you'll head for Naivasha to arrive in time for lunch. The day's activities include a boat ride on Lake Naivasha followed by a walking safari in the animal sanctuary. You'll relax at the hotel for the afternoon, enjoying the beautiful scenery along the shores of Lake Naivasha. You'll head back to camp to freshen up, enjoy a freshly prepared dinner, and overnight stay.`, image: 'Large herd of elephants crossing the Chobe River' },
      { day: 8, location: 'Naivasha to Amboseli national park', mainDestination: 'Amboseli National Park', nights: 1, hotel: `Hunter's Luxury Manor`, activity: `Your safari starts with your pick-up at 7:30 am from Naivasha and drive to Amboseli National Park via mai mahiu and have a stopover at great rift valley escarpment for 30 minutes and later continue with the safari. You'll arrive for lunch, enjoy a hot lunch, and have some time to relax. At 4 pm, you'll head out for an afternoon game drive. Afterward, you'll head back to your camp for dinner and your overnight stay.

The highlight of Amboseli is the great concentration of elephants, the largest in the world. It is home to over 1600 elephants from 56 different families. Each of the elephants has a name and a photo attached to its name. You will enjoy all of this with the magnificent background of Mount Kilimanjaro, the highest point in Africa, standing at 5895 meters.`, image: 'Large herd of elephants crossing the Chobe River' },
      { day: 9, location: 'More game drives at amboseli national park', mainDestination: 'Amboseli National Park', nights: 1, hotel: `Hunter's Luxury Manor`, activity: `Today's itinerary is flexible; you can discuss and arrange this with your guide. You can either have a relaxed breakfast and depart for a full-day game drive around 7:30 am with a picnic lunch. Then, you'll return to the camp late afternoon. Otherwise, you can depart at 6 am on an early morning game drive and return to your accommodation for breakfast, and relax for the rest of the day. You will depart at 4:00 pm on an afternoon game drive and return at 6.30 pm to the camp for dinner and your overnight stay.`, image: 'Large herd of elephants crossing the Chobe River' },
      { day: 10, location: 'Amboseli national park to Nairobi', mainDestination: 'Nairobi', nights: 0, hotel: '', activity: `After your breakfast you will be transfered to from Amboseli national park to Jomo Kenyatta International airport for your flight back home.A safari  extension can be organised to explore the kenyan coast`, image: 'Large herd of elephants crossing the Chobe River' },
     
    ],
whatToExpect: [
  "Pick-up in Nairobi and drive to Ol Pejeta Conservancy, enjoying scenic views of Mount Kenya en route.",
  "Guided game drive at Ol Pejeta Conservancy, home to elephants, lions, chimpanzees, and the last two northern white rhinos on Earth.",
  "Afternoon game drive at Ol Pejeta with opportunities for wildlife photography and conservation insights.",
  "Scenic drive to Samburu National Reserve with lunch on arrival and afternoon game drive.",
  "Spot the Samburu Special Five including the reticulated giraffe, Grevy's zebra, Somali ostrich, Beisa oryx, and gerenuk.",
  "Morning and afternoon game drives in Samburu to search for elephants, leopards, lions, and other wildlife.",
  "Transfer to Lake Nakuru National Park with afternoon game drive to spot rhinos, giraffes, and buffaloes along the lake shore.",
  "Breakfast and optional cycling safari or hiking adventure in Hell's Gate National Park en route to Masai Mara.",
  "Afternoon cultural walking safari with Masai warriors and visit to a traditional Maasai village.",
  "Full-day or morning/afternoon game drives in Masai Mara with chances to see lions, cheetahs, elephants, zebras, and wildebeest (migration season between July–October).",
  "Drive to Lake Naivasha with boat ride to view hippos and birdlife, followed by a walking safari in a sanctuary.",
  "Transfer to Amboseli National Park, famous for its huge elephant herds and stunning views of Mount Kilimanjaro.",
  "Morning and afternoon game drives in Amboseli to see elephants, buffalo, giraffes, zebras, wildebeest, and hippos.",
  "Optional full-day game drive in Amboseli with picnic lunch in the wild.",
  "Final transfer from Amboseli to Emali train station for your connection to Mombasa or return to Nairobi, marking the end of your safari."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: '3-day-mara-fly-in-fly-out',
    title: '3-Day Mara Fly-in Fly-out Short and Sweet Safari',
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 2700,
    rating: 4.8,
    reviews: 92,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2700,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: "This safari is for 3 days and is designed to introduce you to the world's most famous national reserve. Masai Mara has the highest concentration of wildlife in Kenya and, of course, the great wildebeest migration. This package is worth where you get to fly to Masai Mara, and instead of spending hours on the road, the flight will get you in the middle of the action ASAP. Also, you get to fly out of the Masai Mara. We shall arrange for pick up from the airport, hotel, or your place of residence.",
      tourFeatures: [
               {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury tour",
          description: "This luxury tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request  changes to this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you and won't be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour with single supplement options available."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 3 years",
          description: "The minimum age for this tour is 3 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives, wildlife viewing",
        gameVehicle: "4x4 safari vehicles for game drives ",
        gettingThere: "Light aircraft charter flights between Nairobi and Masai Mara"

      }
    },

    // INCLUSIONS CONTENT
inclusionsContent: {
 "included": [
    {
      "title": "Park fees",
      "subtitle": "(For non-residents)"
    },
    {
      "title": "All activities",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All accommodation",
      "subtitle": "(Unless listed as upgrade)"
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All flights during the tour",
      "subtitle": null
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "Roundtrip airport transfer",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinks",
      "subtitle": "(As specified in the day-by-day section)"
    }
  ],
  "excluded": [
    {
      "title": "International flights",
      "subtitle": "(From/to home)"
    },
    {
      "title": "Additional accommodation before and at the end of the tour",
      "subtitle": null
    },
    {
      "title": "Tips",
      "subtitle": "(Tipping guideline US$10.00 pp per day)"
    },
    {
      "title": "Personal items",
      "subtitle": "(Souvenirs, travel insurance, visa fees, etc.)"
    },
    {
      "title": "Government imposed increase of taxes and/or park fees",
      "subtitle": null
    },
    {
      "title": "Some meals",
      "subtitle": "(As specified in the day-by-day section)"
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "Airport transfer included from Nairobi International Airport to your hotel or residence",
      internationalFlights: "International flights not included ",
      additionalAccommodation: "Additional nights can be arranged at extra cost"
    },
    itinerary: [
      { day: 1, location: 'Fly from Nairobi to Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: 'Mara Engai Lodge', activity: `Our representative will pick you up from the airport, hotel, or your residence and transfer you to Wilson Airport for your local flight to the Masai Mara National Reserve. The flight takes an average of 1 hour, and upon arrival in Masai Mara National Reserve, our driver guide will be waiting. Enjoy an en route game drive and beautiful scenery as you travel to the camp. Masai Mara National Reserve is famous for its high concentration of big cats and annual migration of thousands of wildebeest. Arrive at your camp in time for lunch and check-in. In the afternoon, enjoy a fascinating game-viewing drive—spotting lions, cheetahs, and other spectacular predators. Big cats are not hard to spot, and the elusive leopards are not. It is one of the few places you are guaranteed to spot the famous Big Five on a single morning or afternoon. In the evening, enjoy a delicious dinner at the camp.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: 'Mara Engai Lodge', activity: `You will spend a day in this haven of wildlife with a morning game drive from 6:30am—8:30am. You will return to the camp for breakfast and spend the morning leisurely with an optional visit to the Masai village. After lunch, you will spend the afternoon at leisure. From 4:00pm—6:30pm, you will enjoy your evening game drive. Enjoy phenomenal sightings of the bush as nature teams with diverse animals. Later in the evening you might enjoy a sundowner at the hotel as you reflect on all the fantastic things you have seen and learned despite the briefness of your stay.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Fly from Masai Mara to Nairobi', mainDestination: 'Nairobi(City)', nights: 1, hotel: '', activity: `You will have an early morning game drive as you search for the cats hunting for breakfast. After breakfast, you will leave the camp with wildlife viewing en route to the airstrip for your flight to Nairobi. We will pick you up from Wilson Airport and transfer you to your hotel or airport.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
    ],
whatToExpect:  [
    "Transfer to Wilson Airport for your local flight to the Masai Mara National Reserve.",
    "Upon arrival in Masai Mara, enjoy an en route game drive and scenery on the way to the camp.",
    "Afternoon game-viewing drive to spot lions, cheetahs, and other predators, with a chance to spot the Big Five.",
    "Full day in Masai Mara with a morning game drive and an evening game drive, and time for leisure in between.",
    "Optional visit to a local Masai village on Day 2.",
    "Enjoy an early morning game drive on Day 3 to watch for hunting cats.",
    "En route game viewing as you travel to the airstrip for your flight back to Nairobi.",
    "Transfer from Wilson Airport in Nairobi to your hotel or airport."
  ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  }
];

// Enhanced Dynamic Sidebar Content Component with SIMPLIFIED DESIGN
const DynamicSidebarContent = ({ contentHeight, activeTab, tour }) => {
  const [visibleContent, setVisibleContent] = useState([]);

  useEffect(() => {
    // Calculate what content to show based on available height and active tab
    const calculateVisibleContent = () => {
      const baseFormHeight = 600;
      const availableHeight = Math.max(contentHeight - baseFormHeight - 100, 200);
      
      const contentSections = [];
      
      if (['inclusions', 'getting-there'].includes(activeTab)) {
        contentSections.push('trust');
        setVisibleContent(contentSections);
        return;
      }
      
      if (activeTab === 'day-by-day') {
        contentSections.push('trust');
        contentSections.push('reviews');
        contentSections.push('conservation');
        contentSections.push('wildlife-behavior');
        contentSections.push('tips');
        contentSections.push('stats');
        setVisibleContent(contentSections);
        return;
      }
      
      if (activeTab === 'overview') {
        contentSections.push('trust');
        if (availableHeight > 400) {
          contentSections.push('reviews');
        }
        if (availableHeight > 600) {
          contentSections.push('tips');
        }
        if (availableHeight > 800) {
          contentSections.push('stats');
        }
      }
      
      setVisibleContent(contentSections);
    };

    calculateVisibleContent();
  }, [contentHeight, activeTab]);

  const renderTrustIndicators = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Crown className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">Why Trust Us?</h4>
          <p className="text-orange-400/80 text-sm">Your safari dreams, our expertise</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {trustIndicators.map((indicator, index) => (
          <motion.div 
            key={`trust-${index}`}
            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ x: 3 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-600/50 rounded-lg">
                <div className="text-orange-400">
                  {indicator.icon}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1">{indicator.title}</h5>
                <p className="text-sm text-gray-300">{indicator.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderReviews = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Quote className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">What Travelers Say</h4>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-orange-400 text-sm">4.9/5 from 438+ reviews</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviewsData.slice(0, activeTab === 'day-by-day' ? 3 : 2).map((review) => (
          <motion.div 
            key={`review-${review.id}`}
            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: review.id * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{review.name}</span>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm italic">"{review.review}"</p>
            <p className="text-gray-500 text-xs mt-2">{review.location}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderConservationInsights = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <TreePine className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">Conservation Impact</h4>
          <p className="text-orange-400/80 text-sm">Your safari makes a difference</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {conservationInsights.map((insight, index) => (
          <motion.div 
            key={`conservation-${index}`}
            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30"
            whileHover={{ x: 3 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-600/50 rounded-lg">
                <div className="text-orange-400">{insight.icon}</div>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">{insight.title}</h5>
                <p className="text-sm text-gray-300">{insight.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderWildlifeBehavior = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Binoculars className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">Wildlife Insights</h4>
          <p className="text-orange-400/80 text-sm">Secrets of the savannah</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {wildlifeBehaviorTips.map((tip, index) => (
          <motion.div 
            key={`wildlife-${index}`}
            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30"
            whileHover={{ x: 3 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-orange-400 bg-slate-600/50 rounded-lg p-2">
                {tip.icon}
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">{tip.title}</h5>
                <p className="text-sm text-gray-300">{tip.tip}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderSafariTips = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Compass className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">Expert Safari Tips</h4>
          <p className="text-orange-400/80 text-sm">Professional guidance</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {safariTips.slice(0, activeTab === 'day-by-day' ? 4 : 2).map((tip, index) => (
          <motion.div 
            key={`tip-${index}`}
            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30"
            whileHover={{ x: 3 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-600/50 rounded-lg">
                <div className="text-orange-400">{tip.icon}</div>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">{tip.title}</h5>
                <p className="text-sm text-gray-300">{tip.tip}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStats = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <TrendingUp className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">Safari Statistics</h4>
          <p className="text-orange-400/80 text-sm">Numbers that matter</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: "98%", label: "Big 5 Success" },
          { value: "4.9", label: "Avg Rating" },
          { value: "1,200+", label: "Happy Clients" },
          { value: "15+", label: "Years Experience" }
        ].map((stat, index) => (
          <motion.div 
            key={`stat-${index}`}
            className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:scale-105 transition-all duration-300"
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-3xl font-bold mb-1 text-orange-400">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="mt-6">
      <AnimatePresence>
        {visibleContent.includes('trust') && (
          <div key="trust-section">
            {renderTrustIndicators()}
          </div>
        )}
        {visibleContent.includes('reviews') && (
          <div key="reviews-section">
            {renderReviews()}
          </div>
        )}
        {visibleContent.includes('conservation') && (
          <div key="conservation-section">
            {renderConservationInsights()}
          </div>
        )}
        {visibleContent.includes('wildlife-behavior') && (
          <div key="wildlife-section">
            {renderWildlifeBehavior()}
          </div>
        )}
        {visibleContent.includes('tips') && (
          <div key="tips-section">
            {renderSafariTips()}
          </div>
        )}
        {visibleContent.includes('stats') && (
          <div key="stats-section">
            {renderStats()}
          </div>
        )}
      </AnimatePresence>
      
      {/* Simplified Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50 shadow-lg hover:scale-102 transition-all duration-300"
        whileHover={{ y: -2 }}
      >
        <Heart className="w-10 h-10 text-orange-400 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-white mb-3">Ready for Adventure?</h4>
        <p className="text-gray-300 mb-4">
          Join thousands of travelers who've experienced the magic of African safaris with us.
        </p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Fully Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Award Winning</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TourDetailPage = () => {
  const { tourId } = useParams();
  const { toast } = useToast();
  
  // Initialize all state variables at the top level
  const [activeTab, setActiveTab] = useState('overview');
  const [imagePopup, setImagePopup] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });
  const [contentHeight, setContentHeight] = useState(0);
  const [photosToShow, setPhotosToShow] = useState(4);
  const [showMoreAnimals, setShowMoreAnimals] = useState({});
  
  // Refs for measuring content height
  const tabContentRef = useRef(null);
  
  const tour = allToursData.find(t => t.id === tourId);

  const [formData, setFormData] = useState({
    date: '',
    budget: tour?.budgetPlaceholder || '',
    adults: 1,
    children: 0,
    infants: 0,
    rooms: 1,
    email: '',
    message: ''
  });

  // Measure content height when tab changes or content updates
  useEffect(() => {
    const measureHeight = () => {
      if (tabContentRef.current) {
        const height = tabContentRef.current.offsetHeight;
        setContentHeight(height);
      }
    };

    measureHeight();
    const timeoutId = setTimeout(measureHeight, 500);
    window.addEventListener('resize', measureHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureHeight);
    };
  }, [activeTab, tour]);

  // Handle window resize for photo display
  useEffect(() => {
    const getPhotosToShow = () => {
      if (typeof window !== 'undefined') {
        return window.innerWidth >= 768 ? 4 : 6;
      }
      return 4;
    };

    const handleResize = () => {
      setPhotosToShow(getPhotosToShow());
    };

    setPhotosToShow(getPhotosToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tour) {
      setFormData(prev => ({ 
        ...prev, 
        budget: tour.isCustom ? '' : tour.budgetPlaceholder || '',
        date: '',
        adults: 1,
        children: 0,
        infants: 0,
        rooms: 1,
        email: '',
        message: ''
      }));
    }
  }, [tourId, tour]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || (!tour.isCustom && !formData.date) ) {
        toast({
            title: "Missing Information",
            description: tour.isCustom ? "Please fill in your email and tell us about your dream trip." : "Please fill in the travel date and your email.",
            variant: "destructive"
        });
        return;
    }
    if (tour.isCustom && !formData.message) {
        toast({
            title: "Missing Information",
            description: "Please tell us about your dream safari in the message box.",
            variant: "destructive"
        });
        return;
    }
    console.log("Form Data Submitted:", { tourId: tour.id, tourTitle: tour.title, ...formData });
    toast({
      title: tour.isCustom ? "Custom Safari Inquiry Sent!" : "Itinerary Request Sent!",
      description: tour.isCustom ? `Thank you! We've received your custom safari ideas. Our team will contact you via ${formData.email} shortly!` : `We'll send the detailed itinerary for ${tour.title} to your email: ${formData.email} shortly.`,
      variant: "success"
    });
    setFormData({
      date: '',
      budget: tour?.isCustom ? '' : tour?.budgetPlaceholder || '',
      adults: 1,
      children: 0,
      infants: 0,
      rooms: 1,
      email: '',
      message: ''
    });
  };

  const openImagePopup = (images, title, startIndex = 0) => {
    setImagePopup({
      isOpen: true,
      images,
      currentIndex: startIndex,
      title
    });
  };

  const closeImagePopup = () => {
    setImagePopup({
      isOpen: false,
      images: [],
      currentIndex: 0,
      title: ''
    });
  };

  const navigateImage = (direction) => {
    setImagePopup(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + direction + prev.images.length) % prev.images.length
    }));
  };

  const handleVehicleClick = () => {
    openImagePopup(getVehicleImages(), 'Pop-up Roof 4x4 Vehicle');
  };

  const monthNameToIcon = (monthName) => {
    const lowerMonth = monthName.toLowerCase();
    if (['jun', 'jul', 'aug'].includes(lowerMonth)) return <Sun className="w-5 h-5 text-yellow-400" />;
    if (['sep', 'oct', 'nov'].includes(lowerMonth)) return <CloudDrizzle className="w-5 h-5 text-blue-400" />; 
    if (['dec', 'jan', 'feb'].includes(lowerMonth)) return <Sun className="w-5 h-5 text-orange-500" />; 
    if (['mar', 'apr', 'may'].includes(lowerMonth)) return <CloudDrizzle className="w-5 h-5 text-sky-500" />; 
    return <Calendar className="w-5 h-5 text-gray-400" />;
  };

  // Create tabs for itinerary
  const createItineraryTabs = () => {
    if (!tour?.itinerary || !Array.isArray(tour.itinerary)) return [];
    
    return [{
      id: 'day-by-day',
      label: 'Day by Day',
      content: tour.itinerary
    }];
  };

  const itineraryTabs = createItineraryTabs();

  // Toggle show more animals for a specific day
  const toggleShowMoreAnimals = (dayKey) => {
    setShowMoreAnimals(prev => ({
      ...prev,
      [dayKey]: !prev[dayKey]
    }));
  };

  // NEW: Enhanced Animal Availability Section with Images
  const renderAnimalAvailabilitySection = (tourId, day) => {
    try {
      const animalData = getAnimalAvailabilityForDay(tourId, day);
      if (!animalData || !animalData.animals || animalData.animals.length === 0) return null;

      const sortedAnimals = sortAnimalsByAbundance(animalData.animals);
      const dayKey = `${tourId}-day-${day}`;
      const isShowingMore = showMoreAnimals[dayKey] || false;
      
      // Show first row (6 animals) by default, rest under "show more"
      const firstRowCount = 6;
      const visibleAnimals = isShowingMore ? sortedAnimals : sortedAnimals.slice(0, firstRowCount);
      const hiddenCount = Math.max(0, sortedAnimals.length - firstRowCount);

      return (
        <motion.div 
          className="mt-6 p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Camera className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Wildlife Expected</h4>
              <p className="text-emerald-400/80 text-sm">At {animalData.mainDestination}</p>
            </div>
          </div>

          {/* Seasonal Information Cards - Permanent titles with dynamic content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <motion.div 
              className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-blue-300 text-sm mb-1">Best Time to Visit</h5>
              <p className="text-blue-200 text-xs">{animalData.bestTimeToVisit}</p>
            </motion.div>
            <motion.div 
              className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-orange-300 text-sm mb-1">High Season</h5>
              <p className="text-orange-200 text-xs">{animalData.highSeason}</p>
            </motion.div>
            <motion.div 
              className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-green-300 text-sm mb-1">Best Weather</h5>
              <p className="text-green-200 text-xs">{animalData.bestWeather}</p>
            </motion.div>
          </div>
          
          {/* Animals Grid with Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            <AnimatePresence>
              {visibleAnimals.map((animal, idx) => {
                const abundanceInfo = getAbundanceInfo(animal.abundance);
                return (
                  <motion.div 
                    key={`animal-${dayKey}-${animal.name}-${idx}`}
                    className={`relative p-3 ${abundanceInfo.bgClass} rounded-lg border transition-all duration-300 cursor-pointer group hover:shadow-lg overflow-hidden`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                  >
                    <div className="text-center">
                      {/* Animal Image */}
                      <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden bg-slate-700/30">
                        <img 
                          src={animal.image}
                          alt={animal.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback icon if image fails to load */}
                        <div className="w-full h-full items-center justify-center text-orange-400 hidden">
                          <AnimalIcon type={animal.name} className="w-8 h-8" />
                        </div>
                      </div>
                      
                      <h5 className="font-semibold text-white text-xs mb-1 line-clamp-1">{animal.name}</h5>
                      
                      <div className="flex items-center justify-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${abundanceInfo.color} ring-1 ${abundanceInfo.ringColor}`}></div>
                        <span className={`text-xs font-medium ${abundanceInfo.textColor}`}>
                          {abundanceInfo.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {hiddenCount > 0 && (
            <motion.button
              onClick={() => toggleShowMoreAnimals(dayKey)}
              className="w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 hover:border-slate-500/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isShowingMore ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show More ({hiddenCount} more animals)
                </>
              )}
            </motion.button>
          )}
          
          {/* Enhanced legend with vibrant colors */}
          <motion.div 
            className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {[
                { key: 'abundant', color: 'bg-emerald-500', label: 'Abundant', ring: 'ring-emerald-400/50' },
                { key: 'common', color: 'bg-blue-500', label: 'Common', ring: 'ring-blue-400/50' },
                { key: 'occasional', color: 'bg-amber-500', label: 'Occasional', ring: 'ring-amber-400/50' },
                { key: 'rare', color: 'bg-red-500', label: 'Rare', ring: 'ring-red-400/50' },
                { key: 'very-rare', color: 'bg-purple-500', label: 'Very Rare', ring: 'ring-purple-400/50' }
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color} ring-2 ${item.ring}`}></div>
                  <span className="text-gray-300 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      );
    } catch (error) {
      console.warn('Error rendering animal availability section:', error);
      return null;
    }
  };

  // ENHANCED wildlife section with vibrant colors and improved icons - LEGACY SYSTEM (Still kept for fallback)
  const renderWildlifeSection = (location) => {
    try {
      const wildlife = getWildlifeForLocation(location);
      if (!wildlife || wildlife.length === 0) return null;

      const sortedWildlife = sortWildlifeByAbundance(wildlife);

      return (
        <motion.div 
          className="mt-6 p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Binoculars className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Wildlife Expected</h4>
              <p className="text-orange-400/80 text-sm">At {location}</p>
            </div>
          </div>
          
          {/* Enhanced grid with vibrant colors and better icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {sortedWildlife.map((animal, idx) => {
              const abundanceInfo = getAbundanceInfo(animal.abundance);
              return (
                <motion.div 
                  key={`wildlife-${location}-${animal.name}-${idx}`}
                  className={`relative p-4 ${abundanceInfo.bgClass} rounded-lg border transition-all duration-300 cursor-pointer group hover:shadow-lg`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                      <AnimalIcon type={animal.name} className="w-6 h-6" />
                    </div>
                    
                    <h5 className="font-semibold text-white text-sm mb-2">{animal.name}</h5>
                    
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${abundanceInfo.color} ring-2 ${abundanceInfo.ringColor}`}></div>
                      <span className={`text-xs font-medium ${abundanceInfo.textColor}`}>
                        {abundanceInfo.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Enhanced legend with vibrant colors */}
          <motion.div 
            className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {[
                { key: 'abundant', color: 'bg-emerald-500', label: 'Abundant', ring: 'ring-emerald-400/50' },
                { key: 'common', color: 'bg-blue-500', label: 'Common', ring: 'ring-blue-400/50' },
                { key: 'occasional', color: 'bg-amber-500', label: 'Occasional', ring: 'ring-amber-400/50' },
                { key: 'rare', color: 'bg-red-500', label: 'Rare', ring: 'ring-red-400/50' },
                { key: 'very-rare', color: 'bg-purple-500', label: 'Very Rare', ring: 'ring-purple-400/50' }
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color} ring-2 ${item.ring}`}></div>
                  <span className="text-gray-300 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      );
    } catch (error) {
      console.warn('Error rendering wildlife section:', error);
      return null;
    }
  };

  // Enhanced function to render accommodation card with responsive photo count
  const renderAccommodationCard = (accommodation) => {
    if (!accommodation) return null;

    const visiblePhotos = accommodation.images.slice(0, photosToShow - 1);
    const remainingCount = accommodation.images.length - visiblePhotos.length;

    return (
      <motion.div 
        className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50 hover:shadow-xl hover:border-slate-600/50 transition-all duration-300 max-w-full overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Bed className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Accommodation</h4>
            <p className="text-orange-400/80 text-sm">Where you'll stay</p>
          </div>
        </div>
        
        <div className="mb-4">
          <motion.a 
            href={accommodation.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-300 hover:text-orange-200 transition-colors duration-300 font-bold text-lg flex items-center gap-2 group"
            whileHover={{ x: 5 }}
          >
            {accommodation.name}
            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
          <p className="text-gray-400 mt-1">{accommodation.description}</p>
        </div>
        
        {/* Simplified Photo Grid */}
        <div className={`grid gap-2 mb-4 ${photosToShow === 6 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {visiblePhotos.map((image, idx) => (
            <motion.img 
              key={`hotel-photo-${accommodation.id}-${idx}`}
              src={image}
              alt={`${accommodation.name} photo ${idx + 1}`}
              className="w-full h-20 object-cover rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50"
              onClick={() => openImagePopup(accommodation.images, accommodation.name, idx)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            />
          ))}
          {remainingCount > 0 && (
            <motion.div 
              className="relative cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => openImagePopup(accommodation.images, accommodation.name, photosToShow - 1)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (photosToShow - 1) * 0.1 }}
            >
              <img 
                src={accommodation.images[photosToShow - 1]}
                alt={`${accommodation.name} more photos`}
                className="w-full h-20 object-cover shadow-sm border border-slate-600/30"
              />
              <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex items-center justify-center hover:bg-slate-900/70 transition-all duration-300">
                <div className="text-center">
                  <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                  <span className="text-white font-semibold text-sm">+{remainingCount}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="bg-slate-700/40 rounded-lg px-4 py-2 inline-flex items-center gap-2 hover:bg-slate-700/60 transition-all duration-300"
          whileHover={{ scale: 1.02, x: 3 }}
        >
          <Utensils className="w-5 h-5 text-orange-400" />
          <span className="text-gray-200 font-medium">{accommodation.meals}</span>
        </motion.div>
      </motion.div>
    );
  };

  // Function to render getting there content for each tour
  const renderGettingThereSection = () => {
    if (!tour?.gettingThere) return null;

    const gettingThere = tour.gettingThere;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8 p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Plane className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Getting There</h3>
            <p className="text-orange-400/80 text-sm">Travel & logistics information</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {[
            {
              icon: <MapIcon className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />,
              title: "Tour Location",
              content: (
                <p className="text-gray-300">This tour starts in <strong className="text-orange-300">{gettingThere.startLocation}</strong> and ends in <strong className="text-orange-300">{gettingThere.endLocation}</strong></p>
              )
            },
            {
              icon: <Plane className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />,
              title: "Airports",
              content: (
                <div>
                  <p className="text-gray-300 mb-2">
                    <strong className="text-orange-300">Start:</strong> {gettingThere.startAirport}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-orange-300">End:</strong> {gettingThere.endAirport}
                  </p>
                </div>
              )
            },
            {
              icon: <Truck className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />,
              title: "Airport Transfer",
              content: (
                <p className="text-gray-300">{gettingThere.airportTransfer}</p>
              )
            },
            {
              icon: <Globe className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />,
              title: "International Flights",
              content: (
                <div>
                  <p className="text-gray-300 mb-2">{gettingThere.internationalFlights}</p>
                  <div className="bg-slate-700/50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-orange-300 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      International flights are not included in the tour price
                    </p>
                  </div>
                </div>
              )
            },
            {
              icon: <Bed className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />,
              title: "Extended Stay",
              content: (
                <p className="text-gray-300">{gettingThere.additionalAccommodation}</p>
              )
            }
          ].map((item, index) => (
            <motion.div 
              key={`getting-there-${index}`}
              className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group"
              whileHover={{ x: 5 }}
            >
              <div className="group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">{item.title}</h4>
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderItineraryContent = (dayRange) => (
    <div className="space-y-8">
      {dayRange?.map((item, index) => {
        // Check if this is the last day - skip wildlife for last day
        const isLastDay = index === dayRange.length - 1;
        
        return (
          <motion.div
            key={`itinerary-day-${item.day}-${index}`}
            className="glass-effect rounded-xl p-6 shadow-lg hover:shadow-orange-500/10 transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            {/* Enhanced Day Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                {/* Improved Day Badge */}
                <motion.div 
                  className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 px-4 py-3 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-red-500 transition-all duration-300 min-w-[80px] text-center"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                  <div className="relative">
                    <span className="block text-white font-bold text-lg leading-tight">
                      Day
                    </span>
                    <span className="block text-white font-extrabold text-xl leading-tight">
                      {tour.isCustom ? index + 1 : item.day}
                    </span>
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-300 group-hover:text-orange-200 transition-colors">{item.location}</h3>
                  {/* Hotel Information */}
                  {!tour.isCustom && item.hotel && (
                    <div className="flex items-center gap-2 mt-2">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm font-medium">{item.hotel}</span>
                    </div>
                  )}
                  {/* Main Destination Info for Easy Developer Editing */}
                  {!tour.isCustom && item.mainDestination && (
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 text-sm font-medium">{item.mainDestination}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced Night Badge */}
              {!tour.isCustom && typeof item.nights === 'number' && (
                <motion.div 
                  className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white/20 backdrop-blur-sm transition-all duration-300 ${getNightBadgeColor(item.nights)} hover:scale-105 cursor-pointer flex items-center gap-2 min-w-fit`}
                  whileHover={{ scale: 1.1, rotateZ: 2 }}
                >
                  <Bed className="w-4 h-4" />
                  <span>
                    {item.nights > 0 ? `${item.nights} Night${item.nights > 1 ? 's' : ''}` : 'Transit'}
                  </span>
                </motion.div>
              )}
            </div>
            
            {/* Image - Updated to use centralized image system */}
            
            {item.image && (
              <motion.img 
                className="w-full h-full  object-cover bg-bottom rounded-xl mb-6 shadow-lg cursor-pointer"
                alt={`Image for ${tour.isCustom ? 'step' : 'Day'} ${item.day}: ${item.location} - ${item.image}`}
                src={getDailyItineraryImage(tour.id, item.day)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">{item.activity}</p>
            
            {/* NEW: Enhanced Animal Availability Section with Images - Skip for last day */}
            {!tour.isCustom && !isLastDay && renderAnimalAvailabilitySection(tour.id, item.day)}
            
            {/* Fallback: Legacy Wildlife Section if new system doesn't have data */}
            {!tour.isCustom && !isLastDay && !getAnimalAvailabilityForDay(tour.id, item.day) && renderWildlifeSection(item.location)}
            
            {/* Accommodation Section - Enhanced with responsive photo handling and new system - DIRECTLY BELOW ANIMALS */}
            {!tour.isCustom && !isLastDay && (() => {
              const accommodation = getAccommodationForDay(tour.id, item.day);
              return accommodation ? (
                <div className="mt-6 w-full">
                  <div className="max-w-full overflow-hidden">
                    {renderAccommodationCard(accommodation)}
                  </div>
                </div>
              ) : null;
            })()}
          </motion.div>
        );
      })}
      
      {/* Add content to match sidebar height for day-by-day tab */}
      {activeTab === 'day-by-day' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-effect rounded-xl p-8 text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
        >
          <Camera className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience This Adventure?</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Every day of this safari is carefully crafted to maximize your wildlife encounters and create unforgettable memories. 
            From sunrise game drives to evening sundowners, experience Africa like never before.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">98%</div>
              <div className="text-sm text-gray-400">Big Five Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-sm text-gray-400">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">15+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
          </div>
          <p className="text-orange-300 font-medium">Use the form on the right to start planning your dream safari today!</p>
        </motion.div>
      )}
    </div>
  );

  // Function to render inclusions content from tour data
  const renderInclusionsContent = () => {
    // Check if tour has inclusions data
    if (!tour?.inclusionsContent) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center p-8 bg-slate-800/40 rounded-xl border border-slate-700/50"
        >
          <Info className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Inclusions Information</h3>
          <p className="text-gray-300 text-lg">
            {tour?.isCustom 
              ? "Since this is a custom safari, inclusions will be determined based on your specific requirements and preferences. We'll provide detailed inclusions information with your personalized quote."
              : "Detailed inclusions information is being updated for this tour. Please contact us for specific details about what's included and excluded."
            }
          </p>
        </motion.div>
      );
    }

    const { included, excluded } = tour.inclusionsContent;

    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Included Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-xl p-6 border border-green-500/20 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold text-green-300">Included</h3>
            </div>
            
            <div className="space-y-4">
              {included?.map((item, index) => (
                <motion.div 
                  key={`included-${index}`}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/30 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-medium group-hover:text-green-300 transition-colors">{item.title}</p>
                    {item.subtitle && <p className="text-gray-400 text-sm">{item.subtitle}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Excluded Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-effect rounded-xl p-6 border border-red-500/20 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-2xl font-bold text-red-300">Excluded</h3>
            </div>
            
            <div className="space-y-4">
              {excluded?.map((item, index) => (
                <motion.div 
                  key={`excluded-${index}`}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/30 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-medium group-hover:text-red-300 transition-colors">{item.title}</p>
                    {item.subtitle && <p className="text-gray-400 text-sm">{item.subtitle}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderOverviewContent = () => {
    const overviewData = tour?.overviewContent;

    return (
      <div className="space-y-12">
        {/* Tour Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Tour Overview</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {overviewData?.mainDescription || tour?.description || tour?.overview}
          </p>
        </motion.div>

        {/* Best Months to Visit */}
        {!tour.isCustom && tour?.bestMonths && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Best Months to Visit</h2>
            <div className="flex flex-wrap gap-3">
              {tour.bestMonths.map((month, index) => (
                <motion.span 
                  key={`month-${month}-${index}`}
                  className="flex items-center gap-2 bg-slate-800/70 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 shadow-md hover:bg-slate-700 hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {monthNameToIcon(month)}
                  {month}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tour Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Tour Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(overviewData?.tourFeatures || [
              {
                icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
                title: "Luxury tour",
                description: "This luxury tour uses lodges and tented camps."
              },
              {
                icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
                title: "Can be customized",
                description: "You can request minor changes to the accommodations and destinations of this tour."
              },
              {
                icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
                title: "Private tour",
                description: "This tour will be organized exclusively for you and won't be shared with others."
              },
              {
                icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
                title: "Suitable for solo travelers",
                description: "Solo travelers can book this private tour."
              },
              {
                icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
                title: "Can start any day",
                description: "If availability permits, this tour can start on any day."
              },
              {
                icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
                title: "Suitable for all ages",
                description: "This tour is suitable for children of all ages."
              }
            ]).map((feature, index) => (
              <motion.div 
                key={`feature-${index}`}
                className="glass-effect rounded-xl p-6 hover:scale-105 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">{feature.title}</h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activities & Transportation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Activities & Transportation</h2>
          <motion.div 
            className="glass-effect rounded-xl p-6 space-y-4 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            {[
              {
                icon: <Binoculars className="w-5 h-5 text-orange-400" />,
                label: "Activities:",
                value: overviewData?.activitiesTransportation?.activities || "game drives"
              },
              {
                icon: <Truck className="w-5 h-5 text-orange-400" />,
                label: "Game drives:",
                value: overviewData?.activitiesTransportation?.gameVehicle || "pop-up roof 4x4 vehicle",
                clickable: true
              },
              {
                icon: <Truck className="w-5 h-5 text-orange-400" />,
                label: "Getting around:",
                value: overviewData?.activitiesTransportation?.transportation || "pop-up roof 4x4 vehicle",
                clickable: overviewData?.activitiesTransportation?.transportation?.includes('4x4')
              },
              {
                icon: <Plane className="w-5 h-5 text-orange-400" />,
                label: overviewData?.activitiesTransportation?.airportTransfer || "A transfer from and back to the airport is included",
                value: null
              }
            ].map((item, index) => (
              <motion.div 
                key={`activity-${index}`}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-slate-800/30 transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="bg-orange-500/20 p-2 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  {item.icon}
                </div>
                <div>
                  {item.value ? (
                    <>
                      <span className="text-gray-300">{item.label} </span>
                      <span 
                        className={`text-white font-medium ${item.clickable ? 'hover:text-orange-300 cursor-pointer transition-colors underline decoration-orange-400/50 hover:decoration-orange-300' : ''}`}
                        onClick={item.clickable ? handleVehicleClick : undefined}
                      >
                        {item.value}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-300">{item.label}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* What to Expect - Always display this section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">{tour.isCustom ? "Why Choose a Custom Safari?" : "What to Expect"}</h2>
          {tour?.whatToExpect && Array.isArray(tour.whatToExpect) && (
            <ul className="space-y-3">
              {tour.whatToExpect.map((item, index) => (
                <motion.li 
                  key={`expectation-${index}`}
                  className="flex items-start hover:bg-slate-800/30 p-3 rounded-lg transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Star className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0 group-hover:text-orange-300 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    );
  };

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-900 pt-20 md:pt-28">
        <motion.div 
          className="text-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Search className="w-24 h-24 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">The safari adventure you are looking for does not exist or may have been moved.</p>
          <Link to="/tours">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg rounded-lg">
                Explore Other Tours
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const otherTours = allToursData.filter(t => t.id !== tourId && !t.isCustom).sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="pt-20 md:pt-28 bg-slate-900 text-white">
      <ImagePopup
        isOpen={imagePopup.isOpen}
        onClose={closeImagePopup}
        images={imagePopup.images}
        currentIndex={imagePopup.currentIndex}
        onPrevious={() => navigateImage(-1)}
        onNext={() => navigateImage(1)}
        title={imagePopup.title}
      />

      <section className="relative h-[83vh] md:h-[75vh] -mt-2 md:-mt-5">
        <img 
          className="absolute inset-0 w-full h-full object-cover "
          alt={`Hero image for ${tour.title} showing ${tour.image}`}
          src={getMainTourImage(tour.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 mb-[-30px] md:pb-3 container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {tour.title}
          </motion.h1>
          {!tour.isCustom && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-orange-300 text-lg"
            >
              <span className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> {tour.location}</span>
              <span className="flex items-center"><Clock className="w-5 h-5 mr-2" /> {tour.duration}</span>
              <span className="flex items-center"><Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" /> {tour.rating} ({tour.reviews} reviews)</span>
            </motion.div>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Tab Navigation */}
            <div className="border-b border-slate-700/50">
              <div className="grid grid-cols-2 md:flex md:space-x-1 gap-1 md:gap-0 md:overflow-x-auto scrollbar-hide">
                <motion.button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 md:px-6 py-3 text-xs md:text-sm font-medium rounded-t-lg whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'bg-orange-500 text-white border-b-2 border-orange-500'
                      : 'text-gray-400 hover:text-orange-300 hover:bg-slate-800/50'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Overview
                </motion.button>
                {itineraryTabs?.map((tab) => (
                  <motion.button
                    key={`tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 md:px-6 py-3 text-xs md:text-sm font-medium rounded-t-lg whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white border-b-2 border-orange-500'
                        : 'text-gray-400 hover:text-orange-300 hover:bg-slate-800/50'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
                {!tour.isCustom && (
                  <>
                    <motion.button
                      onClick={() => setActiveTab('getting-there')}
                      className={`px-3 md:px-6 py-3 text-xs md:text-sm font-medium rounded-t-lg whitespace-nowrap transition-all duration-300 ${
                        activeTab === 'getting-there'
                          ? 'bg-orange-500 text-white border-b-2 border-orange-500'
                          : 'text-gray-400 hover:text-orange-300 hover:bg-slate-800/50'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Getting There
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveTab('inclusions')}
                      className={`px-3 md:px-6 py-3 text-xs md:text-sm font-medium rounded-t-lg whitespace-nowrap transition-all duration-300 ${
                        activeTab === 'inclusions'
                          ? 'bg-orange-500 text-white border-b-2 border-orange-500'
                          : 'text-gray-400 hover:text-orange-300 hover:bg-slate-800/50'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Inclusions
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tab-content-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px]"
                ref={tabContentRef}
              >
                {activeTab === 'overview' && renderOverviewContent()}
                {activeTab === 'getting-there' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">Getting There</h2>
                    {renderGettingThereSection()}
                  </div>
                )}
                {activeTab === 'inclusions' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">What's Included & Excluded</h2>
                    {renderInclusionsContent()}
                  </div>
                )}
                {itineraryTabs?.map((tab) => 
                  activeTab === tab.id && (
                    <div key={`tab-content-${tab.id}`}>
                      <h2 className="text-3xl font-bold text-white mb-8">{tour.isCustom ? "How It Works" : "Daily Itinerary"}</h2>
                      {renderItineraryContent(tab.content)}
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-28">
              {/* Main Booking Form */}
              <motion.div 
                className="glass-effect rounded-2xl p-6 md:p-8 shadow-xl mb-6 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{tour.isCustom ? "Design Your Dream Safari" : "Plan Your Trip"}</h3>
                {!tour.isCustom && <p className="text-orange-400 mb-6 text-lg">Starting from ${tour.pricePerPerson}/person</p>}
                {tour.isCustom && <p className="text-orange-400 mb-6 text-lg">Tell us your vision, and we'll make it happen!</p>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!tour.isCustom && (
                      <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1.5">Preferred Travel Date</label>
                      <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required={!tour.isCustom}
                          className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                      />
                      </div>
                  )}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1.5">Your Budget (USD per person{tour.isCustom ? ", optional" : ""})</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="budget"
                        id="budget"
                        min="0"
                        placeholder={tour.isCustom ? "e.g., 5000" : String(tour.budgetPlaceholder || "e.g., 3500")}
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="adults" className="block text-sm font-medium text-gray-300 mb-1.5">Adults (12+)</label>
                      <input
                        type="number"
                        name="adults"
                        id="adults"
                        min="1"
                        value={formData.adults}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="children" className="block text-sm font-medium text-gray-300 mb-1.5">Children (3-11)</label>
                      <input
                        type="number"
                        name="children"
                        id="children"
                        min="0"
                        value={formData.children}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="infants" className="block text-sm font-medium text-gray-300 mb-1.5">Infants (0-2)</label>
                      <input
                        type="number"
                        name="infants"
                        id="infants"
                        min="0"
                        value={formData.infants}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="rooms" className="block text-sm font-medium text-gray-300 mb-1.5">Rooms</label>
                      <input
                        type="number"
                        name="rooms"
                        id="rooms"
                        min="1"
                        value={formData.rooms}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors"
                    />
                  </div>
                  <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
                        {tour.isCustom ? "Tell us about your dream safari (destinations, activities, interests, etc.)" : "Special Requests / Custom Message (Optional)"}
                      </label>
                      <textarea
                          name="message"
                          id="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={tour.isCustom ? "The more details, the better we can tailor your adventure!" : "e.g., dietary needs, accessibility requirements, special occasions"}
                          className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none placeholder-gray-500 hover:border-slate-500 transition-colors resize-none"
                          required={tour.isCustom}
                      ></textarea>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3.5 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="w-5 h-5 mr-2.5" />
                      {tour.isCustom ? "Send Custom Inquiry" : "Get Detailed Itinerary"}
                    </Button>
                  </motion.div>
                </form>
                <p className="text-xs text-gray-400 mt-6 text-center">
                  Our travel experts will contact you with a personalized itinerary and quote.
                </p>
              </motion.div>

              {/* Dynamic Additional Content */}
              <DynamicSidebarContent 
                contentHeight={contentHeight} 
                activeTab={activeTab}
                tour={tour}
              />
            </div>
          </aside>
        </div>
      </div>

      {otherTours.length > 0 && (
        <section className="py-12 md:py-16 border-t border-slate-700/50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-white mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              You Might Also Like
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherTours?.map((suggestedTour, index) => (
                <Link key={`suggested-${suggestedTour.id}`} to={`/tours/${suggestedTour.id}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300 bg-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <img 
                      className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      alt={`Suggested tour: ${suggestedTour.title} - ${suggestedTour.image}`}
                      src={getTourThumbnail(suggestedTour.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">{suggestedTour.title}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-orange-400 text-sm">{suggestedTour.duration}</p>
                        <p className="text-lg font-semibold text-white">${suggestedTour.pricePerPerson}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!tour.isCustom && (tour.prevTrip || tour.nextTrip)) && (
        <section className="py-8 md:py-12 border-t border-slate-700/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {tour.prevTrip && allToursData.find(t => t.id === tour.prevTrip) ? (
                    <Link to={`/tours/${tour.prevTrip}`} className="w-full sm:w-auto">
                        <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" className="w-full border-orange-500/70 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200 transition-all duration-300 py-3 px-6 rounded-lg flex items-center justify-center sm:justify-start">
                              <ArrowLeft className="w-5 h-5 mr-2.5" />
                              <span className="truncate max-w-[150px] sm:max-w-xs">Prev: {allToursData.find(t => t.id === tour.prevTrip)?.title}</span>
                          </Button>
                        </motion.div>
                    </Link>
                    ) : <div className="w-full sm:w-auto"></div>}
                    
                    {tour.nextTrip && allToursData.find(t => t.id === tour.nextTrip) ? (
                    <Link to={`/tours/${tour.nextTrip}`} className="w-full sm:w-auto">
                        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" className="w-full border-orange-500/70 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200 transition-all duration-300 py-3 px-6 rounded-lg flex items-center justify-center sm:justify-start">
                               <span className="truncate max-w-[150px] sm:max-w-xs">Next: {allToursData.find(t => t.id === tour.nextTrip)?.title}</span>
                              <ArrowRight className="w-5 h-5 ml-2.5" />
                          </Button>
                        </motion.div>
                    </Link>
                    ) : <div className="w-full sm:w-auto"></div>}
                </div>
            </div>
        </section>
      )}
    </div>
  );
};

export default TourDetailPage;