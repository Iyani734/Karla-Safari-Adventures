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
const IMAGE_MANAGER = {
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

  tourHeroImages: {
    'custom-trip': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
    '7-Day-Kenyan-Luxury-Safari': '/Elephants_luxury.jpg',
    'tanzania-great-migration': '/wildbeast.jpg',
    'Uganda-Ultimate-Luxury-Safari': '/byeuganda.jpg', 
    'rwanda-mountain-gorillas': '/gorillaDP2.jpg',
    '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli': '/amboseli5.webp',
    '3-day-mara-fly-in-fly-out': '/maasaimara10.jpg',
    'budget-7-Day-Masai-Mara-Nakuru-Naivasha-Amboseli': '/amboseli4.jpg',
    '6-day-serengeti-budget-safari': '/serengeti-budget2.jpg',
    '4-day-gorilla-tracking-and-queen-elizabeth-national-park': '/chipanzee1.jpg',
    '3-day-chimpanzee-trekking-canopy-and-lake-kivu-adventure': '/canopy2.jpg',
    '3-Day-samburu-flying-safari-tour': '/samburu1.webp',
    '12-day-vacation-escape-to-kenya-coast': '/wasini2.webp',
    '4-day-safari-to-awe-inspiring-landscapes-of-mara-in-jeep': '/maasaimara16.webp',
    '10-day-kenyas-wildest-elegance-an-ultra-luxury-safari': '/solio1.jpg',
    '12-day-luxury-honeymoon-safari-and-beach-holiday': '/honeymoon5.webp',
    '3-day-luxury-safari-in-the-great-masai-mara-reserve': '/lions.webp',
    '8-day-unmatched-elegance-crown-jewels-of-kenya-safari' : '/zebra4.avif',
    '7-day-luxury-safari-kruger-national-park-south-africa': '/sunset3.jpg',
    '3-day-luxury-honeymoon-safari-to-serengeti-ngorongoro': '/honeymoon9.webp',
    '6-day-circuit-safari-masai-mara-lake-nakuru-amboseli': '/lakeNakuru13.avif',
    '4-day-masai-mara-nakuru': '/leopard5.jpg',
    '3-day-adventure-in-masai-mara': '/lion8.jpg',
    '7-day-masai-mara-nakuru-naivasha-amboseli' : '/lion9.jpg',
    '8-day-camping-safari-with-cultural-nature-experiences' : '/camping7.webp',
    '3-Day-Ngorongoro-Kilimanjaro-Hike-Materuni-Waterfalls' : '/ngorongoro10.jpg',
    '5-Day-Safari-to-Selous-Nyerere-Mikumi-Maasai-Village' : '/maasaiVillage5.webp',
    '3-Day-Murchison-Falls-NP-Ziwa-and-Budongo-Safari' : '/murchson.jpeg',
    '5-Day-Kruger-Adventure-Safari' : '/kruger4.webp'
  },

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
    '3-day-mara-fly-in-fly-out':{
1: '/maasaimara6.jpg',
2: '/maasaimara4.jpg',
3: '/maasaimara7.jpg',
    },
    'budget-7-Day-Masai-Mara-Nakuru-Naivasha-Amboseli': {
      1: '/maasaimara11.jpg',  
      2: '/maasaimara12.jpeg',
      3: '/masaivilage2.jpg',
      4: '/lakeNakuru3.jpg',
      5: '/amboseli6.jpg',
      6: '/amboseli7.jpg',
     7: '/byebye.jpg',
    },
    '6-day-serengeti-budget-safari': {
      1: '/tarangire2.jpg',  
      2: '/serengeti4.jpg',
      3: '/serengeti5.webp',
      4: '/serengeti6.jpg',
      5: '/ngorongoro2.jpg',
      6: '/amboseli7.jpg',
     7: '/byebye.jpg',
    },
    '4-day-gorilla-tracking-and-queen-elizabeth-national-park': {
      1:  '/bwindi3.webp',
      2:  '/bwindi4.jpg',
      3:  '/queenelizabeth3.jpg',
      4:  '/final1.jpg',
    },
    '3-day-chimpanzee-trekking-canopy-and-lake-kivu-adventure': {
      1:  '/canopy1.jpg',
      2:  '/nyungwe1.jpg',
      3:  '/kivi1.jpg',
    },
     '3-Day-samburu-flying-safari-tour': {
      1:  '/plane1.jpg',
      2:  '/culture1.jpg',
      3:  '/zebra1.jpg',
    },
     '12-day-vacation-escape-to-kenya-coast': {
      1:  '/mombasa1.jpg',
      2:  '/fortJesus.jpg',
      3:  '/mombasa2.webp',
      4:  '/mtwapaCreek1.jpg', 
      5:  '/mombasa4.webp',
      6:  '/mombasa5.jpg',
      7:  '/mombasa6.jpg',
      8:  '/mombasa7.jpg',  
      9:  '/mombasa9.jpg',
      10:  '/shimba1.jpg',
      11:  '/culture2.jpg',
      12:  '/byeSummer.webp',
    },
    '4-day-safari-to-awe-inspiring-landscapes-of-mara-in-jeep' : {
      1:  '/airstrip.jpg',
      2:  '/balloon-masai-mara.jpg',
      3:  '/culture5.jpg',
      4:  '/flying-safari-masaimara.jpg',
    },
    '10-day-kenyas-wildest-elegance-an-ultra-luxury-safari': {
       1: '/airstrip2.jpg',
       2: '/meru1.jpg',
       3: '/zebra2.jpg',
       4 : '/culture6.jpg',
       5 : '/gameDrive1.jpg',
       6 : '/horse2.jpg',
       7 : '/maasaimara21.webp',
       8 : '/ballon1.webp',
       9 : '/sunset1.jpg',
       10 : '/airstrip3.jpg',
    },
    '12-day-luxury-honeymoon-safari-and-beach-holiday' : {
       1: '/kilimanjaroAirport.jpeg',
       2: '/tarangire3.jpg',
       3: '/serengeti7.webp',
       4 : '/seronaValley.jpg',
       5 : '/ngorongoro3.jpg',
       6 : '/ngorongoro4.jpg',
       7 : '/prisonIsland.jpeg',
       '8-11' : '/zanzibarBeach.jpg',
       12 : '/final2.jpg', 
    },
    '3-day-luxury-safari-in-the-great-masai-mara-reserve': {
       1: '/maasaimara24.jpg',
       2: '/maasaimara25.jpg',
       3: '/maasaimara26.webp',
    },
    '8-day-unmatched-elegance-crown-jewels-of-kenya-safari' : {
       1: '/meru3.jpg',
       2: '/meru4.jpg',
       3: '/samburu2.jpg',
       4 : '/samburu3.jpg',
       5 : '/leopard2.JPG',
       6 : '/sundowner.jpg',
       7 : '/hyena.webp',
       8 : '/lion1.jpg',
    },
    '7-day-luxury-safari-kruger-national-park-south-africa' : {
       '1-3': '/timbavati1.jpg',
       '4-6': '/sabisabi.jpg',
       7: '/sunset2.jpg', 
    },
    '3-day-luxury-honeymoon-safari-to-serengeti-ngorongoro' : {
        1: '/serengeti8.jpg',
       2: '/hunting.webp',
       3: '/ngorongoro5.webp',
    },
    '6-day-circuit-safari-masai-mara-lake-nakuru-amboseli': {
      1: '/lions1.webp',
      2: '/maasaimara27.jpg',
      3: '/lakenakuru4.jpg',
      4: '/lakenakuru5.jpg',
      5: '/amboseli10.jpg',
      6: '/amboseli11.jpg',
    },
    '4-day-masai-mara-nakuru': {
    1: '/maasaimara28.jpg',
      2: '/maasaimara29.jpg',
      3: '/maasai village.jpg',
      4: '/lakenakuru6.jpg',
    },
    '3-day-adventure-in-masai-mara': {
      1: '/maasaimara31.avif',
      2: '/maasaimara32.jpeg',
      3: '/maasaimara33.webp',
    },
    '7-day-masai-mara-nakuru-naivasha-amboseli': {
      1: '/lion2.jpg',
      2: '/leopard3.jpg',
      3: '/maasaiVillage2.jpg',
      4: '/lakeNakuru7.jpg',
      5: '/amboseli12.webp',
      6: '/elephant3.jpg',
      7: '/giraffe2.jpg',
    },
    '8-day-camping-safari-with-cultural-nature-experiences': {
       1: '/tanzania.jpg',
      2: '/materuniFalls.jpg',
      3: '/lion4.jpg',
      '4-5': '/serengeti9.webp',
      6: '/ngorongoro6.jpg',
      7: '/mtowaumbu.jpg',
      8: '/culture7.jpg',
    },
    '3-Day-Ngorongoro-Kilimanjaro-Hike-Materuni-Waterfalls' : {
       1: '/ngorongoro7.jpg',
          2: '/hike.avif',
      3: '/materuniFalls1.jpg',
    },
    '5-Day-Safari-to-Selous-Nyerere-Mikumi-Maasai-Village' : {
     1: '/nyerere.jpg',
      2: '/nyerere2.jpg',
      3: '/mikumi.webp',
      4: '/mikumi2.jpg',
      5: '/maasaiVillage3.jpg',
    },
    '3-Day-Murchison-Falls-NP-Ziwa-and-Budongo-Safari' : {
 1: '/murchisonFall.jpg',
      2: '/murchisonFall2.jpg',
      3: '/gorilla2.webp',
    },
    '5-Day-Kruger-Adventure-Safari' : {
  1: '/kruger1.jpg',
     2: '/kruger2.jpeg',
      3: '/panorama2..jpg',
      4: '/lion5.jpg',
      5: '/sunrise.webp'

    }


  },

  vehicleImages: [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop',
  ]
};

// ========================================
// ENHANCED ACCOMMODATION MANAGEMENT SYSTEM
// ========================================
// Professional-grade accommodation system with robust error handling
// and comprehensive logging for debugging purposes

const ACCOMMODATION_MANAGER = {
  // Hotel definitions with complete data structure
  hotels: {
    'ol-tukai-lodge': {
      id: 'ol-tukai-lodge',
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
      id: 'lake-naivasha-sopa-resort',
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
      id: 'sarova-lion-hill-game-lodge',
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
      id: 'sarova-mara-game-camp',
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
    // Additional hotels for other tours
    'lake-manyara-kilimamoja-lodge': {
      id: 'lake-manyara-kilimamoja-lodge',
      name: 'Lake Manyara Kilimamoja Lodge',
      description: 'Luxury lodge overlooking Lake Manyara',
      meals: 'All Meals Included',
      website: 'https://wellworthcollection.co.tz/lake-manyara-kilimamoja/',
      images: [
        '/kilimamoja1.jpg',
        '/kilimamoja2.jpg',
        '/kilimamoja3.jpg',
        '/kilimamoja4.jpg'
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
       '/engai1.jpeg','/engai2.jpeg','/engai3.jpeg','/engai4.jpg','/engai5.jpg','/engai6.jpg','/engai7.jpg','/engai8.jpg','/engai9.jpg','/engai10.jpg','/engai11.jpg','/engai12.jpg','/engai13.jpg',
      ]   

  },
  'lenchada-tourist-camp': {
 name: 'Lenchada Tourist Camp',
      description: 'Budget tented camp located less than 1hr drive from Masai Mara NR',
      meals: 'All Meals Included',
      website: 'https://lenchadatouristcamp.com/',
      images: [ '/Lenchada1.jpg','/Lenchada2.jpg','/Lenchada3.jpeg','/Lenchada4.jpg','/Lenchada5.jpg','/Lenchada6.jpg', ]
  },
    'hillcourt-resort-and-spa': {
      name: 'Hillcourt Resort and Spa',
      description: 'Mid-range resort located in Nakuru City',
      meals: 'All Meals Included',
      website: 'https://www.hillcourtresort.com/',
      images: [ '/hillcourt1.jpg','/hillcourt2.jpg','/hillcourt3.jpg','/hillcourt4.jpg','/hillcourt5.jpg','/hillcourt6.jpg','/hillcourt7.jpg','/hillcourt8.jpg','/hillcourt9.jpg','/hillcourt10.jpg', ]
  },
  'hotel-chambai-safari': {
      name: 'Hotel Chambai Safari',
      description: 'Budget hotel located near Lake Naivasha (Naivasha)',
      meals: 'All Meals Included',
      website: 'https://www.hotelchambaisafari.com/',
      images: [ '/chambai1.jpg','/chambai2.jpg','/chambai3.jpg','/chambai4.jpg','/chambai5.jpg','/chambai6.jpg', ]
  },
  'manjaro-tented-camp': {
      name: 'Manjaro Tented Camp',
      description: 'Budget tented camp bordering Amboseli NP without fences',
      meals: 'All Meals Included',
      website: 'https://manjarotentedcamp.com/',
      images: ['/manjaro1.jpg','/manjaro2.jpg','/manjaro3.jpg','/manjaro4.jpeg','/manjaro5.jpeg',]
  },
  'fig-lodge': {
      name: 'Fig Lodge',
      description: 'Luxury lodge located in Nairobi',
      meals: 'All Meals Included',
      website: 'https://www.figlodge.com/',
      images: ['/fig1.jpeg','/fig2.jpg','/fig3.jpg','/fig4.jpg','/fig5.webp','/fig6.webp','/fig7.webp',]
  },
  'budget-camping': {
      name: 'Budget Camping',
      description: 'Budget camping accommodation with basic amenities',
      meals: 'All Meals Included',
      website: '',
      images: ['/camping1.jpeg','/camping2.jpeg','/camping3.jpeg','/camping4.jpeg','/camping5.jpeg','/camping6.jpeg',]
  },
  'ear ken barham guest house': {
    name: 'Ear Ken Barham Guest House',
    description: 'Budget guest house located less than 1hr drive from Nyungwe NP (Chimps)',
    maels: 'All Meals Included',
    website: '',
    images: ['/ken1.jpg','/ken2.jpg','/ken3.jpg','/ken4.jpg','/ken5.jpg','/ken6.jpg',]
  },
  'rwiza-village-guest-house': {
    name: 'Rwiza Village Guest House',
    description: 'Mid-range hotel located at Lake Kivu',
    meals: 'All Meals Included',
    website: '',
    images: ['/rwiza1.jpg','/rwiza7.jpg','/rwiza3.jpg','/rwiza4.jpg','/rwiza5.jpg','/rwiza6.jpg',]
  },
  'bweza-gorilla-lodge': {
    name: 'Bweza Gorilla Lodge',
    description: 'Mid-range lodge located just outside Bwindi Impenetrable NP (Gorillas)',
    meals: 'All Meals Included',
    website: 'https://bwezagorillalodge.com/',
    images: ['/bweze1.jpg','/bweze2.jpg','/bweze3.jpg','/bweze4.jpg','/bweze5.jpg','/bweze6.jpg',]
  },
  'the-bush-lodge': {
    name: 'The Bush Lodge',
    description: 'Mid-range banda located just outside Queen Elizabeth NP',
    meals: 'All Meals Included',
    website: 'https://naturelodgesuganda.com/the-bush-lodge/',
    images: ['/bush1.jpg','/bush2.jpg','/bush3.jpg','/bush4.jpg','/bush5.jpg','/bush6.jpg',]
  },
  'severin-sea-lodge': {
    name: 'Severin Sea Lodge',
    description: 'Mid-range resort located in Mombasa (City)',
    meals: 'All Meals Included',
    website: 'https://www.severinsealodge.com/',
    images: ['/severin1.avif','/severin2.avif','/severin3.jpg','/severin4.jpg','/severin5.jpg','/severin6.jpg','/severin7.jpg',]
  },
   'diani-sea-resort': {
    name: 'Diani Sea Resort',
    description: 'Mid-range resort located at Diani Beach',
    meals: 'All Meals Included',
    website: 'https://www.dianisearesort.de/',
    images: ['/dianiSea1.jpg','/dianiSea2.jpg','/dianiSea3.jpg','/dianiSea4.jpg','/dianiSea5.jpg','/dianiSea6.jpg','/dianiSea7.jpg','/dianiSea8.jpg','/dianiSea9.jpg','/dianiSea10.jpg',]
  },
  '&beyond-kichwa-tembo-tented-camp': {
    name: '&Beyond Kichwa Tembo Tented Camp',
    description: 'Luxury plus tented camp located inside Mara Triangle (Masai Mara NR)',
    meals: 'All Meals Included',
    website: 'https://www.andbeyond.com/our-lodges/africa/kenya/masai-mara-national-park/andbeyond-kichwa-tembo-tented-camp/',
    images: ['/kichwa1.jpg','/kichwa2.jpg','/kichwa3.jpg','/kichwa4.jpg','/kichwa5.jpg','/kichwa6.jpg','/kichwa7.jpg','/kichwa8.jpg','/kichwa9.jpg','/kichwa10.jpg','/kichwa11.jpg','/kichwa12.jpg',]
  },
  'elewana-elsa-kopje-meru': {
    name: `Elewana Elsa's Kopje Meru`,
    description: 'Luxury lodge located inside Meru NP',
    meals: 'All Meals Included',
    website: 'https://www.elewanacollection.com/elsa-s-kopje-meru/at-a-glance',  
    images: ['/elsa1.jpg','/elsa2.jpg','/elsa3.jpg','/elsa4.jpg','/elsa5.jpg','/elsa6.jpg','/elsa7.jpg','/elsa8.jpg','/elsa9.jpg','/elsa10.jpg','/elsa11.jpg','/elsa12.jpg','/elsa13.jpg','/elsa14.jpg','/elsa15.jpg','/elsa16.jpg',]
  },
    'sasaab-camp': {
    name: `Sasaab Camp`,
    description: 'Luxury plus tented camp located just outside Samburu NR',
    meals: 'All Meals Included',
    website: 'https://www.thesafaricollection.com/properties/sasaab/',  
    images: ['/sasaab1.jpg','/sasaab2.jpg','/sasaab3.jpg','/sasaab4.jpg','/sasaab5.jpg','/sasaab6.jpg','/sasaab7.jpg',]
  },
      'solio-lodge': {
    name: `Solio Lodge`,
    description: 'Luxury plus lodge located inside Solio Ranch (Laikipia Plateau)',
    meals: 'All Meals Included',
    website: 'https://www.thesafaricollection.com/properties/solio-lodge/',  
    images: ['/solio1.jpg','/solio2.jpg','/solio3.jpg','/solio4.jpg','/solio5.jpg','/solio6.jpg','/solio7.jpg','/solio8.jpg','/solio9.jpg','/solio10.jpg',]
  },
    'gran-melia-arusha': {
    name: `Gran Meliá Arusha`,
    description: 'Luxury hotel located in Arusha (City)',
    meals: 'All Meals Included',
    website: 'https://www.melia.com/en/hotels/tanzania/arusha',  
    images: ['/meliaArusha1.jpg','/meliaArusha2.jpg','/meliaArusha3.jpg','/meliaArusha4.jpg','/meliaArusha5.jpg','/meliaArusha6.jpg','/meliaArusha7.jpg','/meliaArusha8.jpg','/meliaArusha9.jpg','/meliaArusha10.jpg','/meliaArusha11.jpg','/meliaArusha12.jpg','/meliaArusha13.jpg','/meliaArusha14.jpg','/meliaArusha15.jpg','/meliaArusha16.jpg']
  },
  'lake-manyara-kilimamoja-lodge': {
    name: 'Lake Manyara Kilimamoja Lodge',
    description: 'Luxury lodge located 1-2hr drive from Tarangire NP',
    meals: 'All Meals Included',
    website: 'https://wellworthcollection.co.tz/lake-manyara-kilimamoja/',
    images: ['/kilimaMoja1.jpg','/kilimaMoja2.jpg','/kilimaMoja3.jpg','/kilimaMoja4.jpg','/kilimaMoja5.jpg','/kilimaMoja6.jpg','/kilimaMoja7.jpg','/kilimaMoja8.jpg','/kilimaMoja9.jpg','/kilimaMoja10.jpg','/kilimaMoja11.jpg',]
  },
  'four-seasons-safari-lodge-serengeti' : {
    name: 'Four Seasons Safari Lodge Serengeti',
    description: 'Luxury lodge inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://www.fourseasons.com/serengeti/',
    images: ['/fourSeasons1.jpg','/fourSeasons2.jpg','/fourSeasons3.jpg','/fourSeasons4.png','/fourSeasons5.jpg','/fourSeasons6.jpg','/fourSeasons7.jpg','/fourSeasons8.jpg','/fourSeasons9.jpg','/fourSeasons10.jpg','/fourSeasons11.jpg','/fourSeasons12.jpg','/fourSeasons13.jpg',]
  },
  'ngorongoro-lodge-melia-collection' : {
    name: 'Ngorongoro Lodge Meliá Collection',
    description: 'Luxury lodge on the crater rim of Ngorongoro Crater',
    meals: 'All Meals Included',
    website: 'https://www.melia.com/en/hotels/tanzania/ngorongoro-crater/ngorongoro-lodge-melia-collection',
    images: ['/ngorongoroMelia1.jpg','/ngorongoroMelia2.jpg','/ngorongoroMelia3.jpg','/ngorongoroMelia4.jpg','/ngorongoroMelia5.jpg','/ngorongoroMelia6.jpg','/ngorongoroMelia7.jpg','/ngorongoroMelia8.jpg','/ngorongoroMelia9.jpg','/ngorongoroMelia10.jpg','/ngorongoroMelia11.jpg','/ngorongoroMelia12.jpg','/ngorongoroMelia13.jpg','/ngorongoroMelia14.jpg','/ngorongoroMelia15.jpg','/ngorongoroMelia16.jpg']
  },
  'zanzibar-serena-hotel' : {
    name: 'Zanzibar Serena Hotel',
    description: 'Luxury hotel located in Stone Town (Zanzibar)',
    meals: 'All Meals Included',
    website: 'https://www.serenahotels.com/zanzibar',
    images: ['/serenaZanzibar1.jpg','/serenaZanzibar2.jpg','/serenaZanzibar3.jpg','/serenaZanzibar4.jpg','/serenaZanzibar5.jpg','/serenaZanzibar6.jpg','/serenaZanzibar7.jpg','/serenaZanzibar8.jpg','/serenaZanzibar9.jpg','/serenaZanzibar10.jpg','/serenaZanzibar11.jpg','/serenaZanzibar12.jpg','/serenaZanzibar13.jpeg','/serenaZanzibar14.jpeg','/serenaZanzibar15.jpg',]
  },
  'emerald-zanzibar-resort-spa': {
    name: 'Emerald Zanzibar Resort & Spa',
    description: 'Luxury resort at Matemwe Beach (Zanzibar)',
    meals: 'All Meals Included',
    website: 'https://my.emerald-zanzibar.com/',
    images: ['/emerald1.jpeg','/emerald2.jpeg','/emerald3.jpeg','/emerald4.jpeg','/emerald5.jpeg','/emerald6.jpeg','/emerald7.jpeg','/emerald8.jpeg','/emerald9.jpeg','/emerald10.jpeg','/emerald11.jpeg',]
  },
  'elewana-sand-river-masai-mara': {
    name: 'Elewana Sand River Masai Mara',
    description: 'Luxury plus lodge located inside Masai Mara NR',
    meals: 'All Meals Included',
    website: 'https://www.elewanacollection.com/sand-river-masai-mara/at-a-glance',
    images: ['/sandRiver1.jpg','/sandRiver2.jpg','/sandRiver3.jpg','/sandRiver4.jpg','/sandRiver5.jpg','/sandRiver6.jpg','/sandRiver7.jpg','/sandRiver8.jpg','/sandRiver9.jpg','/sandRiver10.jpg','/sandRiver11.jpg','/sandRiver12.jpg','/sandRiver13.jpg','/sandRiver14.jpg',' /sandRiver15.jpg','/sandRiver16.jpg','/sandRiver17.jpg','/sandRiver18.jpg','/sandRiver19.jpg','/sandRiver20.jpg','/sandRiver21.jpg','/sandRiver22.jpg','/sandRiver23.jpg','/sandRiver24.jpg','/sandRiver25.jpg','/sandRiver26.jpg','/sandRiver27.jpg','/sandRiver28.jpg',]
  },
  'kings-camp' : {
    name: 'Kings Camp',
    description: 'Luxury plus lodge inside Timbavati NR (Greater Kruger)',
    meals: 'All Meals Included',
    website: 'https://www.kingscamp.com/',
    images: ['/kings1.jpg','/kings2.jpg','/kings3.jpg','/kings4.jpg','/kings5.jpg','/kings6.jpg','/kings7.jpg','/kings8.jpg','/kings9.jpg',]
  },
  'leopard-hills-lodge' : {
    name: 'Leopard Hills Lodge',
    description: 'Luxury plus lodge inside Leopard Hills GR (Sabi Sands)',
    meals: 'All Meals Included',
    website: 'https://www.leopardhills.com/',
    images: ['/leopardHills1.jpg','/leopardHills2.jpg','/leopardHills3.jpg','/leopardHills4.jpg','/leopardHills5.jpg','/leopardHills6.jpg','/leopardHills7.jpg','/leopardHills8.jpg','/leopardHills9.jpg',]
  },
  'serengeti-serena-safari-lodge' : {
    name: 'Serengeti Serena Safari Lodge',
    description: 'Luxury lodge inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://www.serenahotels.com/serengeti',
    images: ['/serenaSerengeti1.jpg','/serenaSerengeti2.png','/serenaSerengeti3.jpeg','/serenaSerengeti4.png','/serenaSerengeti5.png','/serenaSerengeti6.png','/serenaSerengeti7.jpeg','/serenaSerengeti8.png','/serenaSerengeti9.jpeg','/serenaSerengeti10.jpeg','/serenaSerengeti11.jpeg','/serenaSerengeti12.jpeg','/serenaSerengeti13.jpeg','/serenaSerengeti14.jpeg','/serenaSerengeti15.jpeg','/serenaSerengeti16.jpeg','/serenaSerengeti17.jpeg','/serenaSerengeti18.jpeg','/serenaSerengeti19.jpeg','/serenaSerengeti20.jpeg','/serenaSerengeti21.png',]
  },
  'ngorongoro-serena-safari-lodge' : {
    name: 'Ngorongoro Serena Safari Lodge',
    description: 'Luxury lodge on the crater rim of Ngorongoro Crater',
    meals: 'All Meals Included',
    website: 'https://www.serenahotels.com/ngorongoro',
    images: ['/ngorongoroSerena1.jpeg','/ngorongoroSerena2.png','/ngorongoroSerena3.png','/ngorongoroSerena4.jpeg','/ngorongoroSerena5.png','/ngorongoroSerena6.jpeg','/ngorongoroSerena7.jpeg','/ngorongoroSerena8.png','/ngorongoroSerena9.png','/ngorongoroSerena10.jpeg','/ngorongoroSerena11.jpeg','/ngorongoroSerena12.jpeg','/ngorongoroSerena13.png','/ngorongoroSerena14.png',]
  },
  'enkorok-mara-camp' : {
    name: 'Enkorok Mara Camp',
    description: 'Mid-range tented camp located just outside Masai Mara NR',
    meals: 'All Meals Included',
    website: 'https://www.enkorokmaracamp.com/',
    images: ['/enkorok1.jpg','/enkorok2.jpg','/enkorok3.jpg','/enkorok4.jpg','/enkorok5.jpg','/enkorok6.jpg','/enkorok7.jpg','/enkorok8.jpg','/enkorok9.jpg','/enkorok10.jpg','/enkorok11.jpg','/enkorok12.jpg','/enkorok13.jpg',]
  },
  'sarova-woodlands-hotel-spa' : {
    name: 'Sarova Woodlands Hotel & Spa',
    description: 'Mid-range hotel located less than 1hr drive from Lake Nakuru NP',
    meals: 'All Meals Included',
    website: 'https://sarovahotels.com/woodlands/',
    images: ['/SarovaWoodLands1.jpg','/SarovaWoodLands2.jpg','/SarovaWoodLands3.jpg','/SarovaWoodLands4.jpg','/SarovaWoodLands5.jpg','/SarovaWoodLands6.jpg','/SarovaWoodLands7.jpg','/SarovaWoodLands8.jpg',]
  },
  'summit-safari-lodge' : {
    name: 'Summit Safari Lodge',
    description: 'Mid-range lodge in Arusha (City)',
    meals: 'All Meals Included',
    website: 'https://summitlodge.co.tz/',
    images: ['/summitSafari1.jpg','/summitSafari2.jpeg','/summitSafari3.jpeg','/summitSafari4.jpg','/summitSafari5.jpeg','/summitSafari6.jpeg','/summitSafari7.jpeg','/summitSafari8.jpg','/summitSafari9.jpg','/summitSafari10.jpg','/summitSafari11.jpg','/summitSafari12.jpg','/summitSafari13.jpg','/summitSafari14.jpg','/summitSafari15.jpg','/summitSafari16.jpg','/summitSafari17.jpg','/summitSafari18.jpg','/summitSafari19.jpg','/summitSafari20.jpg','/summitSafari21.jpg','/summitSafari22.jpg','/summitSafari23.jpg',]
  },
  'migombani-campsite' : {
    name: 'Migombani Campsite',
    description: 'Budget camping 1-2hr drive from Tarangire NP',
    meals: 'All Meals Included',
    website: 'https://migombanicampsite.com/',
    images: ['/migombani1.jpg','/migombani2.jpg','/migombani3.jpg','/migombani4.jpg','/migombani5.jpg','/migombani6.jpg',]
  },
  'seronera-public-campsite' : {
    name: 'Seronera Public Campsite',
    description: 'Budget camping inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: '',
    images: ['/seroneraCampingsite1.jpg','/seroneraCampsite2.jpg','/seroneraCampsite3.jpg','/seroneraCampsite4.jpg','/seroneraCampsite5.jpg','/seroneraCampsite6.jpg',]
  },
  'ngorongoro-simba-campsite-a' : {
    name: 'Ngorongoro Simba Campsite A',
    description: 'Budget camping on the crater rim of Ngorongoro Crater',
    meals: 'All Meals Included',
    website: '',
    images: ['/simbaCampsite1.jpg','/simbaCampsite2.jpg','/simbaCampsite3.jpg','/simbaCampsite4.jpg','/simbaCampsite5.jpg','/simbaCampsite6.jpg',]
  },
  'arusha-gateway-lodge-ii' : {
    name: 'Arusha Gateway Lodge II',
    description: 'Budget lodge located in Arusha (City)',
    meals: 'All Meals Included',
    website: 'https://www.arushagatewaylodge.com/',
    images: ['/arushaGateway1.jpg','/arushaGateway2.jpg','/arushaGateway3.jpg','/arushaGateway4.jpg','/arushaGateway5.jpg','/arushaGateway6.jpg',]
  },
  'materuni-homes': {
    name: 'Materuni Homes',
    description: 'Budget lodge located near Moshi (Town)',
    meals: 'All Meals Included',
    website: 'https://materunihomes.com/',
    images: ['/materuni1.jpeg','/materuni2.jpeg','/materuni3.jpeg','/materuni4.jpeg','/materuni5.jpeg','/materuni6.png','/materuni7.png','/materuni8.png','/materuni9.png','/materuni10.png','/materuni11.png','/materuni12.png','/materuni13.png','/materuni14.png','/materuni15.png',]
  },
  'selous-ngalawa-camp' : {
    name: 'Selous Ngalawa Camp',
    description: 'Budget tented camp located just outside Nyerere NP',
    meals: 'All Meals Included',
    website: 'https://www.selousrufijihippoadventure.com/',
    images: ['/selous1.jpg','/selous2.jpg','/selous3.jpg','/selous4.jpg','/selous5.jpg','/selous6.jpg',]
  },
  'camp-bastian-mikumi': {
    name: 'Camp Bastian Mikumi',
    description: 'Mid-range lodge located just outside Mikumi NP',
    meals: 'All Meals Included',
    website: 'https://www.campbastian.com/',
    images: ['/bastian1.jpeg','/bastian2.jpg','/bastian3.jpg','/bastian4.jpg','/bastian5.jpg','/bastian6.jpg','/bastian7.jpeg','/bastian7.webp','/bastian8.jpeg','/bastian8.webp','/bastian9.jpg','/bastian10.jpg','/bastian11.jpg','/bastian12.jpg','/bastian13.jpg','/bastian14.jpg','/bastian15.jpg',]
  },
  'parkside-safari-lodge' : {
    name: 'Parkside Safari Lodge',
    description: 'Budget lodge just outside Murchison Falls NP',
    meals: 'All Meals Included',
    website: 'https://www.parksidesafarilodge.com/',
    images: ['/parkside1.jpg','/parkside2.png','/parkside3.png','/parkside4.webp','/parkside5.jpg','/parkside6.jpg','/parkside7.jpg',]
  },
  'kruger-adventure-lodge': {
    name: 'Kruger Adventure Lodge',
    description: 'Budget lodge near Hazyview (Town)',
    meals: 'All Meals Included',
    website: 'https://www.krugeradventurelodge.co.za/',
    images: ['/krugerAdventures1.jpg','/krugerAdventure2.jpg','/krugerAdventure3.jpg','/krugerAdventure4.jpg','/krugerAdventure5.jpg','/krugerAdventure6.jpg','/krugerAdventure7.jpg','/krugerAdventure8.png','/krugerAdventure9.png','/krugerAdventure10.png','/krugerAdventure11.jpg','/krugerAdventure12.jpg','/krugerAdventure13.png','/krugerAdventure14.png','/krugerAdventure15.jpg','/krugerAdventure16.png','/krugerAdventure17.png','/krugerAdventure18.jpg','/krugerAdventure19.png',]
  },
  'elewana-tarangire-treetops': {
    name: 'Elewana Tarangire Treetops',
    description: 'Luxury lodge just outside Tarangire NP',
    meals: 'All Meals Included',
    website: 'http://www.elewanacollection.com/tarangire-treetops/tarangire-treetops-at-a-glance',
     images: ['/elewana1.jpg','/elewana2.jpg','/elewana3.jpg','/elewana4.jpg','/elewana5.jpg','/elewana6.jpg']
  },
    'warangi-ridge-lodge': {
    name: 'Warangi Ridge Lodge',
    description: 'Luxury tented camp inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://thewildernesscollection.com/warangi-ridge/',
     images: ['/warangi1.jpg','/warangi2.jpg','/warangi3.jpg','/warangi4.jpg','/warangi5.jpg','/warangi6.jpg','/warangi7.jpg','/warangi8.jpg','/warangi9.jpg','/warangi10.jpg']
  },
   'craters-edge-lodge': {
    name: 'Craters Edge Lodge',
    description: 'Luxury lodge less than 1hr drive from Ngorongoro Crater',
    meals: 'All Meals Included',
    website: 'https://thewildernesscollection.com/craters-edge/',
     images: ['/cratersEdge1.png','/cratersEdge2.png','/cratersEdge3.png','/cratersEdge4.png','/cratersEdge5.jpg','/cratersEdge6.png','/cratersEdge7.png','/cratersEdge8.png','/cratersEdge9.png','/cratersEdge10.png','/cratersEdge11.png','/cratersEdge12.png','/cratersEdge13.png']
  },
     'nanyukie-lodge': {
    name: 'Nanyukie Lodge',
    description: 'Luxury plus tented camp inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://www.lemalacamps.com/stay/nanyukie-lodge/',
     images: ['/nanyukieLodge1.png','/nanyukieLodge2.png','/nanyukieLodge3.png','/nanyukieLodge4.png','/nanyukieLodge5.jpg','/nanyukieLodge6.png','/nanyukieLodge7.png','/nanyukieLodge8.png',]
  },
   'mawe-mawe-lodge': {
    name: 'Mawe Mawe Lodge',
    description: 'Luxury lodge on the escarpment above Lake Manyara NP',
    meals: 'All Meals Included',
    website: 'https://mawemawemanyaralodge.co.tz/',
     images: ['/mawemawe1.jpg','/mawemawe3.png','/mawemawe4.jpg','/mawemawe5.png','/mawemawe6.jpg','/mawemawe7.jpg','/mawemawe8.jpg','/mawemawe9.png','/mawemawe10.png',]
  },
  'the-highlands-camp': {
    name: 'The Highlands Camp',
    description: 'Luxury plus tented camp bordering Ngorongoro Crater without fences',
    meals: 'All Meals Included',
    website: 'https://www.asiliaafrica.com/camps-lodges/the-highlands-camp/',
     images: ['/highlandsCamp1.jpg','/highlandsCamp3.jpg','/highlandsCamp4.jpg','/highlandsCamp5.jpg','/highlandsCamp6.jpg','/highlandsCamp7.jpg','/highlandsCamp8.jpg','/highlandsCamp9.jpg','/highlandsCamp10.jpg',]
  },
  'baobab-mara-luxury-camp' : {
    name: 'Baobab Mara Luxury Camp',
    description: 'Luxury tented camp inside Northern Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://baobablodges.com/mara-luxury-camps/',
     images: ['/boababMara1.jpg','/boababMara2.jpg','/boababMara3.jpg','/boababMara4.jpg','/boababMara5.jpg','/boababMara6.jpeg','/boababMara7.jpg','/boababMara8.jpg','/boababMara9.jpg','/boababMara10.jpg',,'/boababMara11.jpg','/boababMara12.jpg','/boababMara13.jpg',]
  },
    'tanzania-bush-camps' : {
    name: 'Tanzania Bush Camps - Central Serengeti',
    description: 'Mid-range tented camp inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://tanzaniabushcamps.com/central-serengeti/',
     images: ['/serengeti-tanzania-bush1.jpg','/serengeti-tanzania-bush2.jpg','/serengeti-tanzania-bush3.jpg','/serengeti-tanzania-bush4.jpg','/serengeti-tanzania-bush5.jpg','/serengeti-tanzania-bush6.jpg','/serengeti-tanzania-bush7.jpg','/serengeti-tanzania-bush8.jpg','/serengeti-tanzania-bush9.jpg','/serengeti-tanzania-bush10.jpg','/serengeti-tanzania-bush11.jpg','/serengeti-tanzania-bush12.jpg','/serengeti-tanzania-bush13.jpg','/serengeti-tanzania-bush14.jpg','/serengeti-tanzania-bush15.jpg','/serengeti-tanzania-bush16.jpg','/serengeti-tanzania-bush17.jpg','/serengeti-tanzania-bush18.jpg',]
  }, 
   'moyo-tented-camp' : {
    name: 'Moyo Tented Camp',
    description: 'Luxury tented camp inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://www.moyotentedcamp.com/',
     images: ['/moyo-tented-camp1.jpeg','/moyo-tented-camp2.jpeg','/moyo-tented-camp3.jpeg','/moyo-tented-camp4.jpeg','/moyo-tented-camp5.jpeg','/moyo-tented-camp6.jpg','/moyo-tented-camp7.jpg','/moyo-tented-camp8.jpg','/moyo-tented-camp9.jpg','/moyo-tented-camp10.jpg','/moyo-tented-camp11.jpg',]
  }, 
     'ngorongoro-marera-mountain-view-lodge' : {
    name: 'Ngorongoro Marera Mountain View Lodge',
    description: 'Luxury lodge 1-2hr drive from Tarangire NP',
    meals: 'All Meals Included',
    website: 'https://mareraviewlodge.com/',
     images: ['/ngorongoro-Marera-mountain-view1.jpeg','/ngorongoro-Marera-mountain-view2.jpeg','/ngorongoro-Marera-mountain-view3.jpeg','/ngorongoro-Marera-mountain-view4.jpeg','/ngorongoro-Marera-mountain-view5.jpeg','/ngorongoro-Marera-mountain-view6.jpeg','/ngorongoro-Marera-mountain-view7.jpeg','/ngorongoro-Marera-mountain-view8.jpeg','/ngorongoro-Marera-mountain-view9.jpeg',]
  }, 
     'into-wild-africa-luxury-safari-camp-serengeti' : {
    name: 'Into Wild Africa Luxury Safari Camp Serengeti',
    description: 'Mid-range tented camp inside Central Serengeti NP',
    meals: 'All Meals Included',
    website: 'https://intowildafrica.com/',
    images: ['/into-the-wild-africa1.jpeg','/into-the-wild-africa2.jpeg','/into-the-wild-africa3.jpeg','/into-the-wild-africa4.jpeg','/into-the-wild-africa5.jpeg','/into-the-wild-africa6.webp','/into-the-wild-africa7.jpg','/into-the-wild-africa8.jpg','/into-the-wild-africa9.jpg','/into-the-wild-africa10.jpg','/into-the-wild-africa11.jpg',]
},   
     'sweetwaters-serena-camp' : {
    name: 'Sweetwaters Serena Camp',
    description: 'Luxury tented camp inside Ol Pejeta Conservancy (Laikipia Plateau)',
    meals: 'All Meals Included',
    website: 'https://www.serenahotels.com/sweetwaters',
    images: ['/sweetwaters-serena-camp1.jpg','/sweetwaters-serena-camp2.jpg','/sweetwaters-serena-camp3.jpg','/sweetwaters-serena-camp4.jpg','/sweetwaters-serena-camp5.jpg','/sweetwaters-serena-camp6.jpg','/sweetwaters-serena-camp7.jpg','/sweetwaters-serena-camp8.jpg','/sweetwaters-serena-camp9.jpg','/sweetwaters-serena-camp10.jpg','/sweetwaters-serena-camp11.jpg','/sweetwaters-serena-camp12.jpg','/sweetwaters-serena-camp13.jpg','/sweetwaters-serena-camp14.jpg','/sweetwaters-serena-camp15.jpeg','/sweetwaters-serena-camp16.jpg','/sweetwaters-serena-camp17.jpeg','/sweetwaters-serena-camp18.jpg','/sweetwaters-serena-camp19.jpg','/sweetwaters-serena-camp20.jpeg','/sweetwaters-serena-camp21.jpg','/sweetwaters-serena-camp22.jpg','/sweetwaters-serena-camp23.jpg','/sweetwaters-serena-camp24.jpg','/sweetwaters-serena-camp25.jpg',]
}, 
     'hhando-coffee-lodge' : {
    name: 'Hhando Coffee Lodge',
    description: 'Mid-range lodge 1-2hr drive from Tarangire NP',
    meals: 'All Meals Included',
    website: 'https://www.hhandocoffeelodge.com/',
    images: ['/hhando-coffee-lodge1.jpg','/hhando-coffee-lodge2.jpg','/hhando-coffee-lodge3.jpg','/hhando-coffee-lodge4.jpg','/hhando-coffee-lodge5.jpg','/hhando-coffee-lodge6.jpg','/hhando-coffee-lodge7.jpg','/hhando-coffee-lodge8.jpg','/hhando-coffee-lodge9.jpg','/hhando-coffee-lodge10.jpg','/hhando-coffee-lodge11.jpg','/hhando-coffee-lodge12.jpg','/hhando-coffee-lodge13.jpg',]
}, 
     'marera-valley-lodge' : {
    name: 'Marera Valley Lodge',
    description: 'Mid-range lodge 1-2hr drive from Ngorongoro Crater',
    meals: 'All Meals Included',
    website: 'https://mareravalley.com/',
    images: ['/marera-valley-lodge1.jpg','/marera-valley-lodge2.jpg','/marera-valley-lodge3.jpg','/marera-valley-lodge4.jpg','/marera-valley-lodge5.jpg','/marera-valley-lodge6.jpg','/marera-valley-lodge7.jpg','/marera-valley-lodge8.jpg',]
},
  'tulia-boutique-hotel-spa' : {
    name: 'Tulia Boutique Hotel & Spa',
    description: 'Mid-range hotel in Arusha (City)',
    meals: 'All Meals Included',
    website: 'https://www.tuliahotelandspa.com/',
    images: ['/tulia-boutique-hotel1.jpg','/tulia-boutique-hotel2.jpg','/tulia-boutique-hotel3.jpg','/tulia-boutique-hotel4.jpg','/tulia-boutique-hotel5.jpg','/tulia-boutique-hotel6.jpg','/tulia-boutique-hotel7.jpeg','/tulia-boutique-hotel8.jpg','/tulia-boutique-hotel9.jpg','/tulia-boutique-hotel10.jpg','/tulia-boutique-hotel11.jpg','/tulia-boutique-hotel12.jpg','/tulia-boutique-hotel13.jpg','/tulia-boutique-hotel14.jpeg','/tulia-boutique-hotel15.jpg','/tulia-boutique-hotel16.jpg','/tulia-boutique-hotel17.jpg','/tulia-boutique-hotel18.jpg','/tulia-boutique-hotel19.jpg',]
},
  'bougainvillea-safari-lodge' : {
    name: 'Bougainvillea Safari Lodge',
    description: 'Mid-range lodge 1-2hr drive from Tarangire NP',
    meals: 'All Meals Included',
    website: 'https://bougainvilleasafarilodge.com/',
    images: ['/bougainvillea-safari-lodge1.jpg','/bougainvillea-safari-lodge2.jpg','/bougainvillea-safari-lodge3.jpg','/bougainvillea-safari-lodge4.jpg','/bougainvillea-safari-lodge5.jpg','/bougainvillea-safari-lodge6.jpg','/bougainvillea-safari-lodge7.jpg','/bougainvillea-safari-lodge8.jpg',]
},
  'camp-lilac' : {
    name: 'Camp Lilac',
    description: 'Mid-range tented camp just outside Mikumi NP',
    meals: 'All Meals Included',
    website: 'https://www.camp-lilac.com/',
    images: ['/camp-lilac.webp','/camp-lilac2.webp','/camp-lilac3.webp','/camp-lilac4.jpg','/camp-lilac5.jpg','/camp-lilac6.jpg','/camp-lilac7.jpg','/camp-lilac8.jpg','/camp-lilac9.jpg','/camp-lilac31.jpg']
},
  'TANAPA-ruaha-bandas' : {
    name: 'TANAPA Ruaha Bandas',
    description: 'Budget banda inside Ruaha NP',
    meals: 'All Meals Included',
    website: '',
    images: ['/tanapa-ruaha-bandas.jpeg',]
},
  'ruaha-hilltop-lodge' : {
    name: 'Ruaha Hilltop Lodge',
    description: 'Mid-range lodge less than 1hr drive from Ruaha NP',
    meals: 'All Meals Included',
    website: 'https://www.ruahahilltoplodge.com/',
    images: ['/ruaha-hilltop-lodge1.jpeg','/ruaha-hilltop-lodge2.jpg','/ruaha-hilltop-lodge3.jpg','/ruaha-hilltop-lodge4.jpg','/ruaha-hilltop-lodge5.jpg','/ruaha-hilltop-lodge6.jpg','/ruaha-hilltop-lodge7.jpg','/ruaha-hilltop-lodge8.jpg',]
},
  'penety-amboseli-resort' : {
    name: 'Penety Amboseli Resort',
    description: 'Mid-range hotel less than 1hr drive from Amboseli NP',
    meals: 'All Meals Included',
    website: 'https://penetyresorts.com/',
    images: ['/penety-amboseli-resort1.jpg','/penety-amboseli-resort2.jpg','/penety-amboseli-resort3.jpg','/penety-amboseli-resort4.jpg','/penety-amboseli-resort5.jpg','/penety-amboseli-resort6.jpg','/penety-amboseli-resort7.jpg','/penety-amboseli-resort8.jpg','/penety-amboseli-resort10.jpg','/penety-amboseli-resort11.jpg',]
},
  'ngulia-safari-lodge' : {
    name: 'Ngulia Safari Lodge',
    description: 'Mid-range lodge inside Tsavo West NP',
    meals: 'All Meals Included',
    website: 'https://nguliasafarilodge.com/',
    images: ['/ngulia-safari-lodge1.jpg','/ngulia-safari-lodge2.jpg','/ngulia-safari-lodge3.jpg','/ngulia-safari-lodge4.jpg','/ngulia-safari-lodge5.jpg','/ngulia-safari-lodge6.jpg','/ngulia-safari-lodge7.jpg',]
}, 
  'voi-safari-lodge' : {
    name: 'Voi Safari Lodge',
    description: 'Mid-range lodge inside Tsavo East NP',
    meals: 'All Meals Included',
    website: 'https://voisafarilodge.com/',
    images: ['/voi-safari-lodge1.jpg','/voi-safari-lodge2.jpg','/voi-safari-lodge3.jpg','/voi-safari-lodge4.jpg','/voi-safari-lodge5.jpg','/voi-safari-lodge6.jpg','/voi-safari-lodge7.jpg','/voi-safari-lodge8.jpg','/voi-safari-lodge9.jpg','/voi-safari-lodge10.jpg','/voi-safari-lodge11.jpg',]
}, 
  'nyati-safari-camp' : {
    name: 'Nyati Safari Camp',
    description: 'Budget tented camp just outside Amboseli NP',
    meals: 'All Meals Included',
    website: 'https://www.nyatisafaricamp.com/',
    images: ['/nyati-safari-camp1.jpg','/nyati-safari-camp2.jpg','/nyati-safari-camp3.jpg','/nyati-safari-camp4.jpg','/nyati-safari-camp5.jpg','/nyati-safari-camp6.jpg','/nyati-safari-camp7.jpg','/nyati-safari-camp8.jpg','/nyati-safari-camp9.jpg','/nyati-safari-camp10.jpg','/nyati-safari-camp11.jpg',]
},  
  'red-elephant-safari-lodge' : {
    name: 'Red Elephant Safari Lodge',
    description: 'Mid-range lodge outside Tsavo East NP',
    meals: 'All Meals Included',
    website: 'https://www.red-elephant-lodge.com/offline/',
    images: ['/red-elephant-lodge1.jpg','/red-elephant-lodge2.jpg','/red-elephant-lodge3.jpg','/red-elephant-lodge4.jpg','/red-elephant-lodge5.jpg','/red-elephant-lodge6.jpg','/red-elephant-lodge7.jpg',]
}, 
  'umoja-campsite' : {
    name: 'Umoja Campsite',
    description: 'Budget camping just outside Samburu NR',
    meals: 'All Meals Included',
    website: 'https://www.umojawomen.or.ke/qinstpckg/index.php',
    images: ['/umoja-campsite1.jpg','/umoja-campsite2.jpg','/umoja-campsite3.jpg','/umoja-campsite4.jpg','/umoja-campsite5.jpg',]
}, 
  'judmaier-campsite' : {
    name: 'Judmaier Campsite',
    description: 'Budget mountain hut on Mt Kenya',
    meals: 'All Meals Included',
    website: 'https://www.umojawomen.or.ke/qinstpckg/index.php',
    images: ['/judmaier-campsite.jpeg',]
}, 
  'shipton-campsite' : {
    name: 'Shipton Campsite',
    description: 'Budget camping on Mt Kenyaa',
    meals: 'All Meals Included',
    website: '',
    images: ['/shiptons1.jpg','/shiptons2.jpg','/shiptons3.jpg','/shiptons4.jpg','/shiptons5.jpg','/shiptons6.jpg',]
},   




  },
  // Tour accommodation mapping with normalized day keys
  tourAccommodations: {
    '7-Day-Kenyan-Luxury-Safari': {
      '1': 'ol-tukai-lodge',
      '2': 'ol-tukai-lodge',
      '3': 'lake-naivasha-sopa-resort',
      '4': 'sarova-lion-hill-game-lodge',
      '5': 'sarova-mara-game-camp',
      '6': 'sarova-mara-game-camp'
    },
    'tanzania-great-migration': {
      '1': 'lake-manyara-kilimamoja-lodge',
      '2': 'ngorongoro-lions-paw-camp',
      '3': 'melia-serengeti-lodge',
      '4': 'melia-serengeti-lodge',
      '5-6': 'nasikia-mobile-migration-camp'
    },
    'Uganda-Ultimate-Luxury-Safari': {
      '1': 'paraa-safari-lodge',
      '2': 'paraa-safari-lodge',
      '3': 'chimpundu-lodge',
      '4': 'chimpundu-lodge',
      '5': 'mweya-safari-lodge',
      '6': 'mweya-safari-lodge',
      '7': 'mahogany-springs-lodge',
      '8': 'mahogany-springs-lodge',
      '9': 'mihingo-lodge'
    },
    'rwanda-mountain-gorillas': {
      '1': 'tiloreza-volcanoes-ecolodge',
      '2': 'tiloreza-volcanoes-ecolodge',
      '3': 'tiloreza-volcanoes-ecolodge'
    },
    '10-Day-Kenya-Safari-ol-Pejeta-Samburu-Nakuru-Mara-Amboseli': {
      '1': 'maisha-sweetwaters-camp',
      '2': 'ashnil-samburu-camp',
      '3': 'ashnil-samburu-camp',
      '4': 'ziwa-bush-lodge',
      '5': 'jambo-mara-safari-lodge',
      '6': 'jambo-mara-safari-lodge',
      '7': 'avian-court-hotel',
      '8': 'hunter-luxury-lodge',
      '9': 'hunter-luxury-lodge'
    },
    '3-day-mara-fly-in-fly-out': { 
      '1': 'mara-engai-lodge',
      '2': 'mara-engai-lodge'
    },
    'budget-7-Day-Masai-Mara-Nakuru-Naivasha-Amboseli': {
      '1': 'lenchada-tourist-camp',
      '2': 'lenchada-tourist-camp',
      '3': 'hillcourt-resort-and-spa',
      '4': 'hotel-chambai-safari',
      '5': 'manjaro-tented-camp',
      '6': 'manjaro-tented-camp'   
    },
    '6-day-serengeti-budget-safari': {
      1: 'fig-lodge',
      2: 'budget-camping',
      3: 'budget-camping',
      4: 'budget-camping',
      5: 'fig-lodge'
    },
    '4-day-gorilla-tracking-and-queen-elizabeth-national-park': {
     1: 'bweza-gorilla-lodge',
      2: 'the-bush-lodge',
      3: 'the-bush-lodge',
    },
    '3-day-chimpanzee-trekking-canopy-and-lake-kivu-adventure': {
      1: 'ear ken barham guest house',
      2: 'rwiza-village-guest-house',
    },
       '3-Day-samburu-flying-safari-tour': {
      1: 'ashnil-samburu-camp',
      2: 'ashnil-samburu-camp',
    },
    '12-day-vacation-escape-to-kenya-coast': {
      1: 'severin-sea-lodge',
      2: 'severin-sea-lodge',
      3: 'severin-sea-lodge',
      4: 'severin-sea-lodge',
      5: 'diani-sea-resort',
      6: 'diani-sea-resort',
      7: 'diani-sea-resort',
      8: 'diani-sea-resort',
      9: 'diani-sea-resort',
      10: 'diani-sea-resort',
      11: 'diani-sea-resort', 
    },
    '4-day-safari-to-awe-inspiring-landscapes-of-mara-in-jeep': {
      1: '&beyond-kichwa-tembo-tented-camp',
      2: '&beyond-kichwa-tembo-tented-camp',
      3: '&beyond-kichwa-tembo-tented-camp', 
    },
    '10-day-kenyas-wildest-elegance-an-ultra-luxury-safari' : {
      1: 'elewana-elsa-kopje-meru',
      2: 'elewana-elsa-kopje-meru',
      3: 'sasaab-camp',
      4: 'sasaab-camp',
      5: 'solio-lodge',
      6: 'solio-lodge',
      7: '&beyond-kichwa-tembo-tented-camp',
      8: '&beyond-kichwa-tembo-tented-camp',
      9: '&beyond-kichwa-tembo-tented-camp',
    },
    '12-day-luxury-honeymoon-safari-and-beach-holiday' : {
      1: 'gran-melia-arusha',
      2: 'lake-manyara-kilimamoja-lodge',
      3: 'four-seasons-safari-lodge-serengeti',
      4: 'four-seasons-safari-lodge-serengeti',
      5: 'ngorongoro-lodge-melia-collection',
      6: 'zanzibar-serena-hotel',
      '7-11': 'emerald-zanzibar-resort-spa',
    },
    '3-day-luxury-safari-in-the-great-masai-mara-reserve' : {
      1: 'elewana-sand-river-masai-mara',
      2: 'elewana-sand-river-masai-mara',
    },
    '8-day-unmatched-elegance-crown-jewels-of-kenya-safari' : {
      1: 'elewana-elsa-kopje-meru',
      2: 'elewana-elsa-kopje-meru',
      3: 'sasaab-camp',
      4: 'sasaab-camp',
      5: '&beyond-kichwa-tembo-tented-camp',
      6: '&beyond-kichwa-tembo-tented-camp',
      7: 'elewana-sand-river-masai-mara',
    },
    '7-day-luxury-safari-kruger-national-park-south-africa' : {
      '1-3': 'kings-camp',
      '4-6': 'leopard-hills-lodge',
    },
    '3-day-luxury-honeymoon-safari-to-serengeti-ngorongoro' : {
      1: 'serengeti-serena-safari-lodge',
      2: 'ngorongoro-serena-safari-lodge',
    },
    '6-day-circuit-safari-masai-mara-lake-nakuru-amboseli' : {
      1: 'lenchada-tourist-camp',
      2: 'lenchada-tourist-camp',
      3: 'hillcourt-resort-and-spa',
      4: 'manjaro-tented-camp',
      5: 'manjaro-tented-camp',
    },
    '4-day-masai-mara-nakuru' : {
     1: 'enkorok-mara-camp',
      2: 'enkorok-mara-camp',
      3: 'sarova-woodlands-hotel-spa',
    },
    '3-day-adventure-in-masai-mara' : {
      1: 'lenchada-tourist-camp',
      2: 'lenchada-tourist-camp', 
    },
    '7-day-masai-mara-nakuru-naivasha-amboseli': {
      1: 'lenchada-tourist-camp',
      2: 'lenchada-tourist-camp', 
      3: 'hillcourt-resort-and-spa',
      4: 'hotel-chambai-safari',
      5: 'manjaro-tented-camp',
      6: 'manjaro-tented-camp',
    },
    '8-day-camping-safari-with-cultural-nature-experiences': {
      1: 'summit-safari-lodge',
      2: 'summit-safari-lodge', 
      3: 'migombani-campsite',
      '4-5': 'seronera-public-campsite',
      6: 'ngorongoro-simba-campsite-a',
      7: 'summit-safari-lodge',
    },
    '3-Day-Ngorongoro-Kilimanjaro-Hike-Materuni-Waterfalls' : {
         1: 'arusha-gateway-lodge-ii',
      2: 'materuni-homes', 
    },
    '5-Day-Safari-to-Selous-Nyerere-Mikumi-Maasai-Village' : {
      1: 'selous-ngalawa-camp',
      2: 'selous-ngalawa-camp', 
      3: 'camp-bastian-mikumi',
      4: 'camp-bastian-mikumi',
    },
    '3-Day-Murchison-Falls-NP-Ziwa-and-Budongo-Safari' : {
      1: 'parkside-safari-lodge',
      2: 'parkside-safari-lodge',
    },
    '5-Day-Kruger-Adventure-Safari' : {
      1: 'kruger-adventure-lodge',
      2: 'kruger-adventure-lodge',
      3: 'kruger-adventure-lodge',
      4: 'kruger-adventure-lodge',
    },
    '5-day-kojuu-private-explorer-tour' : {
     1: 'elewana-tarangire-treetops',
      2: 'warangi-ridge-lodge',
      3: 'warangi-ridge-lodge',
      4: 'craters-edge-lodge',
    },
    '5-day-premium-luxury-serengeti-gateway-safari' : {
      1: 'gran-melia-arusha',
      2: 'nanyukie-lodge'
    },
    '4-day-safari-high-end' : {
      1: 'mawe-mawe-lodge',
      2: 'nanyukie-lodge',
      3: 'the-highlands-camp',
    },
    '5-day-tanzania-adventure-serengeti-migration-plus-big-five' : {
       1: 'baobab-mara-luxury-camp',
      2: 'tanzania-bush-camps',
      3: 'moyo-tented-camp',
      4: 'mawe-mawe-lodge',
    },
    '4-day-luxury-tanzania-safari-tarangire-serengeti-ngorongoro' : {
      1: 'ngorongoro-marera-mountain-view-lodge',
      2: 'into-wild-africa-luxury-safari-camp-serengeti',
      3: 'ngorongoro-marera-mountain-view-lodge',
    },
    '4-day-luxury-samburu-olpejata' : {
      1: 'sweetwaters-serena-camp',
      '2-3': 'ashnil-samburu-camp',
    },
    '3-day-tarangire-manyara-ngorongoro-crater' : {
        1: 'hhando-coffee-lodge',
        2: 'marera-valley-lodge',
    },
    '4-day-lodging-tarangire-ngorngoro-materuni' : {
       1: 'tulia-boutique-hotel-spa',
      2: 'bougainvillea-safari-lodge',
      3: 'tulia-boutique-hotel-spa',
    },
    '4-day-astonish-mikumi-ruaha-national-park' : {
      1: 'camp-lilac',
      2: 'TANAPA-ruaha-bandas',
      3: 'ruaha-hilltop-lodge',
    },
    '4-day-amboseli-tsavo-east-west' : {
      1: 'penety-amboseli-resort',
      2: 'ngulia-safari-lodge',
      3: 'voi-safari-lodge',
    },
    '3-day-amboseli-tsavo-east-mombasa' : {
      1: 'nyati-safari-camp',
      2: 'red-elephant-safari-lodge',
    },
    '3-day-samburu-wildernes-adventure' : {
      '1-2': 'umoja-campsite'
    },
    '3-day-mount-kenya-trek-sirimon-to-chogoria' : {
       1: 'judmaier-campsite',
      2: 'shipton-campsite',
    }


   }
};

// ========================================
// CENTRALIZED ANIMAL AVAILABILITY MANAGEMENT SYSTEM
// ========================================
const ANIMAL_AVAILABILITY_MANAGER = {
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
    }
  },

  tourDestinations: {
    '7-Day-Kenyan-Luxury-Safari': {
      '1': 'Amboseli National Park',
      '2': 'Amboseli National Park',
      '3': 'Lake Naivasha',
      '4': 'Lake Nakuru National Park',
      '5': 'Masai Mara National Reserve',
      '6': 'Masai Mara National Reserve'
    }
  }
};

// ========================================
// ENHANCED HELPER FUNCTIONS WITH ROBUST ERROR HANDLING
// ========================================

/**
 * Enhanced accommodation retrieval with comprehensive debugging
 * Senior developer approach: Fail gracefully with detailed logging
 */
const getAccommodationForDay = (tourId, day) => {
  try {
    // Input validation with detailed logging
    if (!tourId || (day === null || day === undefined)) {
      console.warn('🏨 getAccommodationForDay: Missing required parameters', {
        tourId,
        day,
        type: 'validation_error'
      });
      return null;
    }

    // Normalize day to string for consistent lookup
    const normalizedDay = String(day);
    
    console.log('🏨 Accommodation Lookup:', {
      tourId,
      originalDay: day,
      normalizedDay,
      type: 'accommodation_lookup'
    });

    // Get tour accommodation mapping
    const tourAccommodations = ACCOMMODATION_MANAGER.tourAccommodations[tourId];
    
    if (!tourAccommodations) {
      console.warn('🏨 No accommodation mapping found for tour:', {
        tourId,
        availableTours: Object.keys(ACCOMMODATION_MANAGER.tourAccommodations),
        type: 'mapping_not_found'
      });
      return null;
    }

    console.log('🏨 Found tour accommodation mapping:', {
      tourId,
      availableDays: Object.keys(tourAccommodations),
      type: 'mapping_found'
    });

    // Direct day lookup
    let hotelId = tourAccommodations[normalizedDay];
    
    // If not found, try range lookup for multi-day accommodations
    if (!hotelId) {
      for (const dayKey in tourAccommodations) {
        if (dayKey.includes('-')) {
          const [start, end] = dayKey.split('-').map(d => parseInt(d, 10));
          const dayNum = parseInt(normalizedDay, 10);
          
          if (!isNaN(start) && !isNaN(end) && !isNaN(dayNum) && dayNum >= start && dayNum <= end) {
            hotelId = tourAccommodations[dayKey];
            console.log('🏨 Found accommodation via range lookup:', {
              tourId,
              day: normalizedDay,
              range: dayKey,
              hotelId,
              type: 'range_match'
            });
            break;
          }
        }
      }
    }

    if (!hotelId) {
      console.warn('🏨 No hotel ID found for day:', {
        tourId,
        day: normalizedDay,
        availableDays: Object.keys(tourAccommodations),
        type: 'hotel_id_not_found'
      });
      return null;
    }

    console.log('🏨 Found hotel ID:', {
      tourId,
      day: normalizedDay,
      hotelId,
      type: 'hotel_id_found'
    });

    // Get hotel data
    const hotelData = ACCOMMODATION_MANAGER.hotels[hotelId];
    
    if (!hotelData) {
      console.error('🏨 Hotel data not found:', {
        hotelId,
        availableHotels: Object.keys(ACCOMMODATION_MANAGER.hotels),
        type: 'hotel_data_missing'
      });
      return null;
    }

    console.log('🏨 ✅ Successfully retrieved accommodation:', {
      tourId,
      day: normalizedDay,
      hotelId,
      hotelName: hotelData.name,
      type: 'success'
    });

    return {
      id: hotelId,
      ...hotelData
    };

  } catch (error) {
    console.error('🏨 ❌ Error in getAccommodationForDay:', {
      error: error.message,
      stack: error.stack,
      tourId,
      day,
      type: 'function_error'
    });
    return null;
  }
};

/**
 * Get animal availability data for a specific tour day
 */
const getAnimalAvailabilityForDay = (tourId, day) => {
  try {
    if (!tourId || !day) return null;
    
    const normalizedDay = String(day);
    const tourDestinations = ANIMAL_AVAILABILITY_MANAGER.tourDestinations[tourId];
    if (!tourDestinations) return null;

    let destinationKey = tourDestinations[normalizedDay];
    
    if (!destinationKey) {
      for (const dayKey in tourDestinations) {
        if (dayKey.includes('-')) {
          const [start, end] = dayKey.split('-').map(d => parseInt(d));
          const dayNum = parseInt(normalizedDay);
          if (!isNaN(start) && !isNaN(end) && !isNaN(dayNum) && dayNum >= start && dayNum <= end) {
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
// IMAGE HELPER FUNCTIONS
// ========================================

const getTourThumbnail = (tourId) => {
  if (!tourId) return IMAGE_MANAGER.tourThumbnails['custom-trip'];
  return IMAGE_MANAGER.tourThumbnails[tourId] || IMAGE_MANAGER.tourThumbnails['custom-trip'];
};

const getMainTourImage = (tourId) => {
  if (!tourId) return IMAGE_MANAGER.tourHeroImages['custom-trip'];
  return IMAGE_MANAGER.tourHeroImages[tourId] || IMAGE_MANAGER.tourHeroImages['custom-trip'];
};

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

const getVehicleImages = () => {
  return IMAGE_MANAGER.vehicleImages || [];
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

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

const getAbundanceInfo = (abundance) => {
  const normalizedAbundance = abundance?.toLowerCase() || 'none';
  
  // Simplified color system that matches the site's theme
  const abundanceMap = {
    'abundant': { 
      color: 'text-emerald-600', 
      label: 'Abundant',
      dotColor: 'bg-emerald-500'
    },
    'common': { 
      color: 'text-emerald-600', 
      label: 'Common',
      dotColor: 'bg-emerald-500'
    },
    'occasional': { 
      color: 'text-amber-600', 
      label: 'Occasional',
      dotColor: 'bg-amber-500'
    },
    'rare': { 
      color: 'text-gray-500', 
      label: 'Rare',
      dotColor: 'bg-gray-400'
    },
    'rare to none': { 
      color: 'text-gray-500', 
      label: 'Rare',
      dotColor: 'bg-gray-400'
    },
    'very rare': { 
      color: 'text-gray-500', 
      label: 'Very Rare',
      dotColor: 'bg-gray-400'
    },
    'very-rare': { 
      color: 'text-gray-500', 
      label: 'Very Rare',
      dotColor: 'bg-gray-400'
    },
    'none': { 
      color: 'text-gray-500', 
      label: 'None',
      dotColor: 'bg-gray-400'
    }
  };
  return abundanceMap[normalizedAbundance] || abundanceMap['none'];
};

const getNightBadgeColor = (nights) => {
  if (nights === 0) return 'bg-gray-500/80 text-gray-200';
  return 'bg-slate-600/80 text-slate-200';
};

// ========================================
// SAMPLE DATA
// ========================================

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
  }
];

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
  }
];

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
  }
];

const conservationInsights = [
  {
    icon: <TreePine className="w-5 h-5" />,
    title: "Conservation Impact",
    content: "Your safari directly supports wildlife conservation and local communities. We partner with conservation organizations to protect endangered species."
  }
];

const wildlifeBehaviorTips = [
  {
    title: "Big Cat Behavior",
    tip: "Lions are most active during cooler parts of the day. Look for them resting under acacia trees during midday heat.",
    icon: <Zap className="w-5 h-5" />
  }
];

// ========================================
// TOURS DATA
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
    pricePerPerson: 2999,
    rating: 5.0,
    reviews: 538,
    description: "Explore the pristine Okavango Delta by mokoro and boat, then witness the massive elephant herds of Chobe National Park. A journey of contrasts and incredible wildlife.",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2999,
    
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
    pricePerPerson: 2999,
    rating: 4.8,
    reviews: 657,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2999,
    
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
  }, /// budget tours
  {
    id: 'budget-7-Day-Masai-Mara-Nakuru-Naivasha-Amboseli',
    title: '7-Day Masai Mara-Nakuru-Naivasha-Amboseli',
    location: 'Kenya',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 1399,
    rating: 4.5,
    reviews: 4647,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1399,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This is an epic budget adventure to Kenya’s premier wildlife reserves. The tour takes you through the spectacularly scenic Great Rift Valley to Lake Nakuru, a bird lover’s paradise, then to Naivasha Hells Gate Park. Search for the Big Five, big cats & wildebeest in Masai Mara. From Masai Mara, the tour finally explores Amboseli National Park, lying in the foothills of Mount Kilimanjaro.`,
      tourFeatures: [
               {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps and hotels."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can not be customized",
          description: "The accommodations and destinations of this tour cannot be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
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
        activities: "game drives, wildlife viewing",
        gameVehicle: "4x4 safari vehicles for game drives ",
        gettingThere: "pop-up roof 4x4 vehicle"

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
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
      { day: 1, location: 'Nairobi ~ Masai Mara National Park', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: 'Lenchada Tourist Camp', activity: `Leave Nairobi for Masai Mara Game Reserve with a picnic lunch en route. On arrival, proceed for a game drive in search of black manned lions, elephants, leopards, cheetahs, buffaloes and other plain game. Return to Lenchada Tourist Camp for dinner and your overnight stay`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Masai Mara National Reserve Extended Drive', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: 'Lenchada Tourist Camp', activity: `After breakfast, proceed on a full day of game viewing within the reserve. The landscape here is scenic savannah grassland on rolling hills. The reserve is the best park for game in Kenya as it has an extensive road and track network which allows for close-range viewing and photography. Break for your picnic lunch at the hippo pool, looking out for hippos and crocodiles. Dinner and your overnight stay will be at the campsite.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Masai Mara National Park - Nakuru', mainDestination: 'Nakuru (City)', nights: 1, hotel: 'Hillcourt Resort & Spa', activity: `After early breakfast there is optional visit masai village and after depart to Nakuru with a picnic lunch on the way. You will be arriving in the evening. Check into your hotel, relax, swim or catch up with your family back home there is Wifi for good comunication. Dinner and your overnight stay will be at Hill court hotel resort.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 4, location: `Lake Nakuru National Park - Lake Naivasha`, mainDestination: 'Lake Naivasha (Naivasha)', nights: 1, hotel: 'Hotel Chambai Safari', activity: `After an early breakfast, proceed to the park where you will see a lot of flamingos among other birds. About 350 species
recorded. This is also home to the black and the white rhinoceros. The park has also been established for the protection of endangered species such as the rhino and also home to Columbus monkeys, leopards, giraffes, and a variety of plain antelope. Late in the afternoon, drive to Naivasha arriving in the evening. Dinner and your overnight stay will be at Hotel Chambai Safari.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 5, location: 'Lake Naivasha~Amboseli National Park', mainDestination: 'Amboseli National Park', nights: 1, hotel: 'Manjaro Tented Camp', activity: `After an early breakfast, proceed to Hells Gate National Park where you will have a chance to visit the Geothermal Power Plant in OlKaria and the Hot Springs. This is the only park that allows transport by walking and cycling. Later, with a picnic
lunch on the way, depart to Amboseli via Nairobi. Arrive and check into Amboseli Manjaro Tented camp. If time allows proceed for evening game drive and return back for dinner and overnight.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 6, location: 'Amboseli National Park Extensive Game Drive', mainDestination: 'Amboseli National Park', nights: 1, hotel: 'Manjaro Tented Camp', activity: `You'll have a day of game drives in this park which contains swampy grounds in which elephants and hippos bathe in abundance. A variety of plains game, antelopes and birds can also be seen and Mt. Kilimanjaro’s peak too if the weather conditions permit. We will cater for picnic lunches. Later on, return for your overnight stay at Amboseli Manjaro tented camp.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 7, location: 'Amboseli National Park - Nairobi', mainDestination: 'Nairobi ', nights: 0, hotel: '', activity: `After breakfast, leave the campsite for the last game drive as you leave the park for Nairobi. Picnic lunch served en-route. Arrive in Nairobi late in the afternoon. Drop off will be at the airport or your hotel to end the safari.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
    ],
whatToExpect:[
  "Leave Nairobi for Masai Mara Game Reserve, with a picnic lunch en route.",
  "Enjoy a game drive upon arrival at Masai Mara, in search of black-manned lions, elephants, leopards, and other plain game.",
  "Full day of game viewing within the Masai Mara National Reserve, with a picnic lunch at the hippo pool.",
  "Optional visit to a Masai village before departing to Nakuru.",
  "Depart to Nakuru with a picnic lunch on the way. Settle into the hotel and enjoy the amenities.",
  "Proceed to Lake Nakuru National Park to see flamingos, other birds, and endangered species like the rhino.",
  "Drive to Lake Naivasha in the late afternoon.",
  "Visit Hells Gate National Park, where you can walk or cycle and see the Geothermal Power Plant and Hot Springs.",
  "Depart to Amboseli via Nairobi with a picnic lunch on the way. Enjoy an evening game drive if time permits.",
  "Full day of game drives in Amboseli National Park, where you can see elephants, hippos, and potentially the peak of Mt. Kilimanjaro.",
  "Transfer from Amboseli National Park back to Nairobi."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '6-day-serengeti-budget-safari',
    title: '6-day-Serengeti Budget Safari',
    location: 'Tanzania',
    duration: '6 Days / 5 Nights',
    pricePerPerson: 1350,
    rating: 4.5,
    reviews: 92,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1350,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This budget-friendly 6-day camping safari takes you through Tanzania’s iconic Northern Safari Circuit, offering an unparalleled wildlife experience amid stunning and diverse landscapes. You'll spot playful monkeys in dense forests, witness lions lounging in trees, observe elephants meandering through acacia woodlands, and encounter a variety of wildlife within the breathtaking Ngorongoro Crater. Your journey also includes an unforgettable visit to the legendary Serengeti National Park.`,
      tourFeatures: [
               {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps and hotels."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can not be customized",
          description: "The accommodations and destinations of this tour cannot be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives, wildlife viewing",
        gameVehicle: "4x4 safari vehicles for game drives ",
        gettingThere: "pop-up roof 4x4 vehicle"

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
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro International Airport ",
      endLocation: "Arusha", 
      endAirport: "Kilimanjaro International Airport ",
      airportTransfer: "Airport transfer included from Kilimanjaro International Airport to your hotel or residence",
      internationalFlights: "International flights not included ",
      additionalAccommodation: "Additional nights can be arranged at extra cost"
    },
    itinerary: [
      { day: 1, location: 'Tarangire National Park', mainDestination: 'Tarangire National Park', nights: 1, hotel: 'Fig Lodge', activity: `In the morning, your personal safari guide will pick you up from your accommodation in Arusha, marking the start of your adventure. As you drive along well-paved roads through the scenic Maasai plains, you’ll pass vibrant Maasai communities dressed in their colorful attire—herding cattle, riding bicycles, and guiding donkey carts along the roadside.

Your destination is Tarangire National Park, renowned for its massive elephant herds and diverse landscapes. From the open roof of your safari vehicle, you'll take in the sweeping savanna, seasonal swamps, and the life-giving Tarangire River. Keep your eyes peeled for zebra, wildebeest, buffalo, elephant, and giraffe, along with the possibility of spotting lions stealthily hunting or leopards lounging in the trees above.

After an exhilarating game drive filled with incredible wildlife encounters, you’ll exit the park and head to a beautifully situated campsite, where playful monkeys can be seen in the surrounding trees.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Serengeti National Park', mainDestination: 'Serengeti National Park', nights: 1, hotel: 'Budget camping', activity: `After breakfast, your journey continues toward the lush highlands, where the Iraqw people cultivate wheat, coffee, and corn. As you pass through the Ngorongoro Conservation Area, you'll marvel at the breathtaking Ngorongoro Crater—an ancient caldera formed by a volcanic eruption nearly three million years ago.

By midday, you will arrive in the Serengeti, a name derived from the Maasai word Serenget, meaning "Endless Plains." As Tanzania’s largest national park, it boasts an incredible variety of landscapes, from vast grasslands and shimmering lakes to swamps and rugged mountains. The park is home to the legendary Great Migration, where thousands of wildebeest and zebras traverse the terrain in search of fresh grazing, an awe-inspiring sight depending on the season.

After an exciting game drive through this iconic wilderness, you’ll make your way to your campsite, where a warm meal and a night under the star-studded African sky await.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Serengeti National Park', mainDestination: 'Northern Serengeti National Park', nights: 1, hotel: 'Budget camping', activity: `You'll spend the entire day exploring the vast wilderness of Serengeti National Park on thrilling game drives. This iconic park is home to an incredible variety of wildlife, including impalas, buffalo, crocodiles, and hippos. However, it is best known for the awe-inspiring Great Migration, where massive herds of zebras and wildebeest move across the plains in search of fresh grazing.

The migration patterns are dictated by rainfall and shift from year to year. From November to December, the herds travel from the northern woodlands and hills to the lush southern plains. During the long rainy season from April to June, they make their way back north.

After an unforgettable day of wildlife encounters, you'll return to your campsite inside the Serengeti for dinner and a restful overnight stay.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 4, location: `Serengeti National Park`, mainDestination: 'Central Serengeti National Park', nights: 1, hotel: 'Budget camping', activity: `After an early breakfast, you'll set off on another thrilling game drive through the Serengeti, where you may have the chance to spot the legendary Big Five—lion, elephant, buffalo, rhino, and leopard. As you explore the vast, unfenced wilderness, you’ll witness animals roaming freely, offering an uninterrupted and immersive safari experience.

Later, you'll begin your journey toward the Ngorongoro Crater. Upon reaching the crater’s edge, take in your first breathtaking view of the natural wonder that awaits you the next day—glistening streams, sweeping grasslands, and an incredible concentration of wildlife.

As the sun sets, you'll settle in at your campsite on the crater’s rim, where the warm glow of dusk paints the sky, creating a serene and unforgettable atmosphere as you drift off to sleep.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 5, location: 'Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: 1, hotel: 'Fig Lodge', activity: `Early risers will be treated to a breathtaking sunrise over the crater’s edge, a perfect start to an unforgettable day. After a hearty breakfast, you'll embark on an adventurous descent into the Ngorongoro Crater. This UNESCO World Heritage Site, often referred to as one of Africa’s Seven Natural Wonders, was formed millions of years ago by the massive eruption of a volcano. Spanning approximately 260 square kilometers and plunging 610 meters deep, it is one of the most remarkable ecosystems on Earth.
With an astonishing density of wildlife, home to around 25,000 animals, the crater offers some of the best wildlife viewing in Tanzania. You may encounter wildebeest, zebras, gazelles, elephants, and some of the 500+ bird species that inhabit the area.

After a thrilling safari and a picnic lunch in the crater, you will ascend its steep walls and head to Fig Tree Lodge & Camp, where a delicious dinner and a restful overnight stay await.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 6, location: 'Lake Manyara National Park', mainDestination: 'Lake Manyara National Park', nights: 1, hotel: '', activity: `After breakfast, you'll set off for the final destination of your unforgettable safari—Lake Manyara National Park. Located 120 km west of Arusha, this relatively small yet diverse park is renowned for its breathtaking landscapes and abundant wildlife.

The park's name, Lake Manyara, is a vast, shallow salt lake that expands and contracts with the seasons. It serves as a sanctuary for thousands of flamingos and more than 500 other bird species, making it a paradise for birdwatchers. As you explore, keep an eye out for monkeys swinging through the trees, giraffes gracefully roaming the plains, and herds of zebras, buffalo, and elephants.

With its varied scenery, ranging from open grassy plains and primate-filled woodlands to towering baobab-dotted cliffs, Lake Manyara offers a unique and picturesque safari experience.

After an eventful day of game drives, you will make your way back to Arusha, bringing your incredible adventure to a close.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
       
    ],
whatToExpect:[
  "Drive from Arusha to Tarangire National Park for an afternoon game drive focused on its famous elephant herds.",
  "Journey through the Ngorongoro highlands to the Serengeti for an introductory game drive on its iconic 'Endless Plains'.",
  "Spend a full day on extensive game drives exploring the vast Serengeti, with a focus on the Great Migration.",
  "Enjoy a final morning game drive in the Serengeti before traveling to your campsite on the Ngorongoro Crater rim.",
  "Descend into the Ngorongoro Crater for a spectacular day of wildlife viewing in a unique, self-contained ecosystem.",
  "Explore the diverse habitats of Lake Manyara National Park before concluding your safari with a return to Arusha."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '4-day-gorilla-tracking-and-queen-elizabeth-national-park',
    title: `4-Day Gorilla Tracking and Queen Elizabeth National Park`,
    location: 'Uganda',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1925,
    rating: 4.9,
    reviews: 989,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1925,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This 4-day gorilla tracking and Queen Elizabeth National Park safari will take you to Bwindi's Impenetrable Forest National Park, home to endangered mountain gorillas. The safari is perfect for travelers who want to track gorillas but are in Uganda for a short time for either business or conference and also want to include wildlife safari before flying back home.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps and hotels."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can not be customized",
          description: "The accommodations and destinations of this tour cannot be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
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
        activities: "game drives, gorilla trekking & boat trip",
        gameVehicle: "pop-up roof minivan ",
        gettingThere: "pop-up roof minivan"

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
      "title": "Gorilla permits",
      "subtitle": "(One per person, non-resident)"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Entebbe",
      startAirport: "Entebbe Airport (EBB)",
      endLocation: "Entebbe", 
      endAirport: "Entebbe Airport (EBB)",
      airportTransfer: "Airport transfer included from Entebbe Airport (EBB) to your hotel or residence",
      internationalFlights: "International flights not included ",
      additionalAccommodation: "Additional nights can be arranged at extra cost"
    },
    itinerary: [
      { day: 1, location: 'Transfer to Bwindi Impenetrable National Park', mainDestination: 'Bwindi Impenetrable National Park (Gorillas)', nights: 1, hotel: 'Bweza Gorilla Lodge', activity: `Today after early breakfast at 6:00 am, your safari guide  will come to pick you up from your hotel or at the airport and head to Bwindi Impenetrable Forest National Park in South Western Uganda. You will have a stopover at the equator for a photo moment and a break before you proceed to Bwindi Forest. You will have en route lunch in Mbarara.
Bwindi Impenetrable Forest National Park is famous for gorilla tracking of the endangered mountain gorillas. There are about 880 mountain gorillas that live in the whole world and half of them call Uganda home. Mountain gorillas cannot live in a zoo and the only chance you have to see them is by signing up for this safari or other Uganda wildlife safaris.
Coming up close and personal with the gentle giant mountain gorillas is a breath-taking experience, a once-in-a-while experience
You will get to the lodge in time for dinner and an overnight stay.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Gorilla Tracking and Transfer to Queen Elizabeth National Park', mainDestination: 'Bwindi Impenetrable National Park (Gorillas)', nights: 1, hotel: 'The Bush Lodge (Banda)', activity: `Today is the day you have been waiting for. You will wake up early, and have a good breakfast. Your guide will then transfer you to the park offices where you will be briefed about the dos and don’ts of gorilla tracking and what to expect on your gorilla tracking adventure.

Gorilla tracking can take place from 1 hour to 8 hours depending on where they nested the previous night. Coming face to face with the kingdom of mountain gorillas is very exciting, and an experience like no other. Spending one hour with the gorillas will be life-changing, an adventure you will never forget. We advise you to take as many photos as you can but to also spare a moment to just take in the moments. You will only be with the gorillas for one hour, at a distance of 7 meters to avoid contact.
After your trek, you will have lunch in the forest then return to the park offices for a ‘small ceremony’
Your guide will be waiting to transfer you to Queen Elizabeth National Park.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Game Drive and Boat Cruise Along the kazinga Channel', mainDestination: 'Queen Elizabeth National Park', nights: 1, hotel: 'The Bush Lodge (Banda)', activity: `Today after early breakfast, you will go for the morning game drive to search for the early risers. You will search for all the wildlife in the park and are likely to come across elephants, buffalos, lions, waterbucks, leopards, Uganda kob, and many warthogs.
In the afternoon after lunch, you will take a boat safari along the Kazinga Channel which joins Lake George and Lake Edward.
Here, you will see a lot of hippos, more than you can possibly imagine, as well as a variety of other animals that come to the waterhole to drink or bathe. You can expect to see buffalos, crocodiles, bathing elephants, and a range of beautiful birds. This will undoubtedly be one of the highlights of your tour.
After the boat safari, you will have a game drive en route to the lodge.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },  
      { day: 4, location: `Transfer to Entebbe`, mainDestination: 'Entebbe (City)', nights: 1, hotel: '', activity: `Today after breakfast, you will be transferred back to Kampala with lunch en route.
Accommodation for tonight is not included in the program. If you wish to depart tonight from Entebbe Airport, make sure your flight is at 10:00 p.m. or later. If you want us to book one (or more) nights in Kampala and/or Entebbe, please let us know.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },      
    ],
whatToExpect:[
 "Start your adventure with a scenic drive from Kampala or Entebbe to Bwindi Impenetrable Forest, stopping at the equator for a photo opportunity and continuing with an en route lunch in Mbarara.",
  "Arrive in Bwindi and settle into your lodge surrounded by the lush forest, home to nearly half of the world’s mountain gorillas, for dinner and an overnight stay.",
  "Embark on an unforgettable gorilla tracking trek, spending an awe-inspiring hour observing the endangered giants up close in their natural habitat.",
  "Transfer to Queen Elizabeth National Park after your trek, enjoying the changing landscapes and preparing for exciting game-viewing experiences.",
  "Explore Queen Elizabeth with a morning game drive in search of elephants, lions, leopards, buffalo, and Uganda kob, followed by a boat cruise along the Kazinga Channel teeming with hippos, crocodiles, and diverse birdlife.",
  "Conclude your safari with a return journey to Kampala or Entebbe, including a lunch stop en route, with the option to connect to your evening flight or extend your stay."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '3-day-chimpanzee-trekking-canopy-and-lake-kivu-adventure',
    title: `3-Day Chimpanzee Trekking, Canopy & Lake Kivu Adventure`,
    location: 'Rwanda',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1469,
    rating: 4.7,
    reviews: 736,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1469,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `You will visit the Southwestern part of Rwanda and up to the shores of Lake Kivu and have a lifetime experience. You'll visit the Nyungwe Forest National Park, one of the wonders of the world, and have the adventure of a lifetime on Lake Kivu during this 3-day safari in Rwanda.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps and hotels."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can not be customized",
          description: "The accommodations and destinations of this tour cannot be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 18 years",
          description: "The minimum age for this tour is 18 years."
        }
      ],
      activitiesTransportation: {
        activities: "chimpanzee trekking",
        gameVehicle: "open-sided 4x4 vehicle, boat & hiking/walking ",
        gettingThere: "pop-up roof minivan"

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
      "title": "Gorilla permits",
      "subtitle": "(One per person, non-resident)"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Kigali",
      startAirport: "Entebbe Airport (EBB)",
      endLocation: "Kigali", 
      endAirport: "Entebbe Airport (EBB)",
      airportTransfer: "Airport transfer included from Entebbe Airport (EBB) to your hotel or residence",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
      { day: 1, location: 'Transfer to Nyungwe National Park + Canopy Walk Adventure', mainDestination: 'Nyungwe National Park (Chimps)', nights: 1, hotel: 'EAR Ken Barham Guest House', activity: `Upon arrival at Kigali International Airport, our dedicated team  will be at the Kigali International Airport for the meet and assist clear with customs. Our guide/driver will be already at your hotel. You'll have your breakfast at leisure before you get on a relaxed drive to the Northern province. You will then embark on a morning journey from Kigali to the lush Nyungwe National Park, renowned for its biodiversity and captivating landscapes. Upon arrival, you'll be immersed in the natural beauty of the park as you prepare for an exhilarating canopy walk. You'll traverse the elevated walkways suspended among the treetops, offering panoramic views of the forest canopy and glimpses of wildlife below. After the canopy walk, you'll settle into your accommodation within the park, surrounded by the sights and sounds of the wilderness.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Chimpanzee Trekking + Tea Experience', mainDestination: 'Lake Kivu', nights: 1, hotel: 'Rwiza Village Guest House', activity: `You'll wake up early for an unforgettable chimpanzee trekking experience in Nyungwe National Park. Accompanied by experienced guides, you will venture into the forest in search of these remarkable primates, observing their behavior in their natural habitat. After the trek, you'll indulge in a leisurely tea experience at a nearby plantation, where you'll learn about the process of tea production and enjoy a tasting session. In the afternoon, you'll bid farewell to Nyungwe National Park and transfer to the tranquil shores of Lake Kivu, where you'll unwind and relax at your lakeside accommodation.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Lake Kivu Exploration + Island Viewing', mainDestination: 'Lake Kivu', nights: '', hotel: '', activity: `You'll embark on a morning boating excursion on the pristine waters of Lake Kivu, soaking in the scenic beauty and tranquillity of the surroundings. You'll cruise along the shores, admiring the rugged coastline and lush vegetation. You'll make a stop at one of the picturesque islands dotting the lake, where you can explore, relax on the beach, or enjoy a refreshing swim in the crystal-clear waters. After island viewing, you will bid farewell to Lake Kivu and embark on the journey back to Kigali, reminiscing about the unforgettable experiences of your Rwandan adventure.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },   
    ],
whatToExpect:[
 "Begin your journey in Kigali with a scenic drive to Nyungwe National Park, home to incredible biodiversity and lush montane forests.",
  "Experience the thrill of walking high above the treetops on Nyungwe’s famous canopy walk, with panoramic views and chances to spot wildlife.",
  "Wake up early for an unforgettable chimpanzee trekking adventure, observing these fascinating primates in their natural forest habitat.",
  "Relax with a unique tea plantation experience, learning about cultivation and enjoying a tasting session before transferring to Lake Kivu.",
  "Unwind on the shores of Lake Kivu, taking in the serene views and enjoying your lakeside stay.",
  "Conclude your adventure with a morning boat excursion on Lake Kivu, exploring islands and scenic coastlines before returning to Kigali."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '3-Day-samburu-flying-safari-tour',
    title: `3-Day Samburu Flying Safari Tour`,
    location: 'Kenya',
    duration: '2 Days / 1 Nights',
    pricePerPerson: 2199,
    rating: 5,
    reviews: 1256,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1256,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This 3-day Samburu Flying Safari offers a luxurious and time-efficient way to explore the rugged and beautiful Samburu National Reserve. Known for its dramatic landscapes, unique wildlife, and rich Samburu culture, this short safari is perfect for travelers seeking an authentic African experience without the long road transfers. With return flights from Nairobi, guests maximize their time in the wild while enjoying top-tier accommodations, game drives, and guided cultural experiences.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury tour",
          description: "This luxury tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can not be customized",
          description: "You can't request changes to this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you. However, wildlife viewing activities are run by the lodges/camps and will be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for solo travelers",
          description: "Solo travelers cannot book this private tour."
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
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle & air transfer"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport can be arranged for an extra cost",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
      { day: 1, location: 'Nairobi – Samburu (Flight + Afternoon Game Drive)', mainDestination: 'Samburu National Reserve', nights: 1, hotel: 'Ashnil Samburu Camp', activity: `Your safari begins with a morning flight from Wilson Airport in Nairobi to the Samburu airstrip, taking about 1.5 hours. Upon arrival, you're welcomed by your lodge's driver-guide and transferred to your luxury safari lodge or camp, where you check in and enjoy a refreshing lunch. After a short rest, embark on your first game drive in the Samburu National Reserve. The reserve is famous for its rare northern species such as the Grevy’s zebra, reticulated giraffe, Somali ostrich, gerenuk, and Beisa oryx—collectively known as the "Samburu Special Five." As the sun sets, return to camp for dinner and a relaxing evening under the stars.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Full Day in Samburu – Game Drives & Cultural Visit', mainDestination: 'Samburu National Reserve', nights: 1, hotel: 'Ashnil Samburu Camp', activity: `Wake up to the sounds of the bush and enjoy an early morning game drive, the best time to spot predators like lions, leopards, and cheetahs on the hunt. After breakfast back at the lodge, you may choose to relax at the pool or participate in a cultural visit to a nearby Samburu village, where you’ll learn about traditional customs, dress, and way of life. In the afternoon, set out on another game drive to explore different areas of the park, perhaps along the Ewaso Nyiro River a vital water source that attracts a wide variety of wildlife. End the day with sundowners (optional extra) in the bush before returning for a candlelit dinner at the lodge.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Samburu – Nairobi (early morning Game Drive + scenic Flight)', mainDestination: '', nights: '', hotel: '', activity: `On your final day, enjoy a leisurely breakfast or one last early morning game drive, depending on your flight schedule. After checking out, you'll be transferred to the airstrip for your return flight to Nairobi. Upon arrival at Wilson Airport, you may connect to your onward journey or be transferred to your hotel. The short safari ends with unforgettable memories of the wildlife and culture of Samburu.`, image: 'African fish eagle perched on a branch overlooking the Chobe River' },   
    ],
whatToExpect:[
 "Fly from Nairobi’s Wilson Airport to Samburu, then enjoy your first afternoon game drive spotting the unique 'Samburu Special Five'.",
  "Set out on an early morning game drive in Samburu, with opportunities to see lions, leopards, and cheetahs on the hunt.",
  "Visit a traditional Samburu village to learn about local customs, culture, and daily life, before relaxing at your lodge or pool.",
  "Head out for another afternoon game drive along the Ewaso Nyiro River, a lifeline for elephants, giraffes, and diverse birdlife.",
  "Enjoy optional sundowners in the bush followed by a candlelit dinner and a relaxing evening under the stars at your lodge.",
  "Conclude your safari with a final morning game drive or breakfast, then take your scenic flight back to Nairobi."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '12-day-vacation-escape-to-kenya-coast',
    title: `12-Day Vacation Escape to Kenya Coast`,
    location: 'Kenya',
    duration: '12 Days / 11 Nights',
    pricePerPerson: 4500,
    rating: 4.9,
    reviews: 1652,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 4500,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `You'll experience the perfect blend of adventure and relaxation on this 12-day journey along Kenya’s breathtaking coast. You'll begin in Mombasa, exploring historical sites, marine parks, and pristine beaches. You'll enjoy excursions to Wasini and Funzi Islands, a safari at Shimba Hills, and cultural encounters. You'll unwind in luxury resorts along Diani Beach while savoring coastal cuisine. This itinerary offers a mix of exploration, wildlife, and leisure, creating unforgettable memories.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses resorts."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request changes to this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you. However, wildlife viewing activities are run by the lodges/camps and will be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 year",
          description: "The minimum age for this tour is 1 year."
        }
      ],
      activitiesTransportation: {
        activities: "beach time",
        gameVehicle: "van,sedan car and train",
        gettingThere: "van,sedan car and train"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport can be arranged for an extra cost",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
      { day: 1, location: 'Arrival in Nairobi and Transfer to Mombasa', mainDestination: 'Mombasa (City)', nights: 1, hotel: 'Severin Sea Lodge', activity: `Upon arrival at Jomo Kenyatta International Airport (JKIA), you will be met by our representative and transferred to Mombasa via train or flight. Upon arrival, you'll check in at the Severin Sea Lodge and settle in. You'll enjoy the beautiful beachfront, relax by the pool, or explore the hotel's amenities.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Historical & Cultural Exploration', mainDestination: 'Mombasa (City)', nights: 1, hotel: 'Severin Sea Lodge', activity: `You'll start your second day with a visit to the historic Fort Jesus, followed by a stroll through Old Town Mombasa, where you’ll admire the Swahili architecture and bustling spice markets. In the afternoon, you'll visit the iconic Mombasa Tusks and explore the local markets. You'll end your day with a visit to Haller Park. You'll watch the feeding sessions of giraffes, hippos, and crocodiles. This is a great opportunity to learn about these fascinating creatures up close.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Marine Adventure & Beach Relaxation', mainDestination: 'Bamburi Beach (Mombasa Beaches)', nights: 1, hotel: 'Severin Sea Lodge', activity: `Your third day will be filled with marine adventures, beginning with a glass-bottom boat ride at Mombasa Marine National Park. Afterward, you will unwind on Nyali Beach or Bamburi Beach, enjoying water sports like windsurfing or jet skiing or do a Sand and Sun bathing. You'll return to your hotel in the evening for a relaxing spa treatment and dinner.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 4, location: 'Lunch at Mtwapa Creek', mainDestination: 'Mtwapa (Mombasa Beaches)', nights: 1, hotel: 'Severin Sea Lodge', activity: `In the afternoon, you'll enjoy a scenic boat tour at Mtwapa Creek, gliding through mangrove-lined waters and spotting birdlife. You'll experience the tranquil beauty of the creek as local fishermen navigate their traditional dhows. You'll arrive at a Creekside restaurant for a delicious seafood lunch with stunning views, savoring fresh, locally sourced dishes. Afterward, you'll return to your resort to relax with a swim, spa treatment, or beachfront dinner under the stars, embracing the coastal serenity. You'll end the evening with a peaceful stroll along the beach, letting the sound of the waves complete your perfect day.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 5, location: 'Leisure & Departure to the South Coast', mainDestination: 'Diani Beach', nights: 1, hotel: 'Diani Sea Resort', activity: `You'll spend your final morning in Mombasa at leisure, taking in the last moments of your stay at the resort. You'll enjoy a refreshing swim in the pool, relax on the beach with the soothing ocean breeze, or indulge in a spa treatment for ultimate relaxation. If you prefer, you'll take a stroll through the resort’s gardens or savor a leisurely breakfast while admiring the coastal views. For those interested in shopping, you can visit a local market or curio shop to pick up unique souvenirs, such as handcrafted jewelry, African prints, or beautifully carved wooden sculptures. After checking out, you'll embark on a scenic drive or a short ferry ride to the South Coast, where the next chapter of your adventure awaits. The journey offers picturesque views of the coastline, lush landscapes, and glimpses of daily life in the coastal towns, setting the stage for more unforgettable experiences ahead.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 6, location: 'Wasini Marine Park Excursion', mainDestination: 'Wasini Island', nights: 1, hotel: 'Diani Sea Resort', activity: `A day tour to Wasini Island offers an unforgettable adventure filled with natural beauty and cultural experiences. The journey begins with a scenic drive along the Kenyan coast, leading to Shimoni, where you’ll board a traditional dhow. As you sail across the turquoise waters of the Indian Ocean, keep an eye out for dolphins, which are often spotted frolicking nearby. Upon reaching Wasini Island, you'll visit the famous Kisite-Mpunguti Marine Park, a highlight, offering the chance to snorkel or dive among vibrant coral reefs teeming with marine life. After the underwater adventure, you'll enjoy a delicious seafood lunch featuring fresh, locally sourced ingredients. The day concludes with a relaxed sail back to the mainland, where you’ll reflect on the day’s experiences and the stunning coastal views.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 7, location: 'Diani Beach Relaxation', mainDestination: 'Diani Beach', nights: 1, hotel: 'Diani Sea Resort', activity: `On this particular day on the South Coast, it will be all about relaxation on the pristine sands of Diani Beach, often rated among the best beaches in Africa. You'll spend the day lounging by the beach, enjoying the crystal-clear waters, and trying out activities like kite surfing. In the evening, you will return to your luxury villa for a gourmet dinner.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 8, location: 'Visit Funzi Island', mainDestination: 'Funzi Island (Beach)', nights: 1, hotel: 'Diani Sea Resort', activity: `Your day trip to Funzi Island will start with a morning pick-up from your accommodation around 7:00 AM, followed by a scenic drive to the boat transfer point. You’ll arrive at Funzi Island by approximately 9:00 AM, where you'll board a boat for a leisurely ride through the mangroves, taking in the sights of local wildlife such as birds. From 9:30 AM to 11:00 AM, you’ll enjoy this scenic boat tour before heading to the island’s pristine beaches around 11:00 AM. Here, you’ll have time to relax, swim, or sunbathe until lunch. At 12:30 PM, a delicious beachside lunch will be served, featuring fresh seafood or local specialties. After lunch, from 1:30 PM to 3:00 PM, you can explore the island’s unique flora and fauna on a guided walk or visit local villages. Your return journey will possibly include a sunset cruise, with an expected arrival back at your starting point by 6:00 PM.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 9, location: 'Relaxation at the Beach and Hotel Leisure', mainDestination: 'Diani Beach', nights: 1, hotel: 'Diani Sea Resort', activity: `On this day, you'll have the perfect opportunity to unwind and soak in the serene coastal atmosphere. You'll spend the day relaxing on the pristine beach, where you can lounge under the sun, take a refreshing dip in the ocean, or enjoy a leisurely walk along the shore. The hotel's facilities are at your disposal, so feel free to indulge in the amenities, whether it’s taking a swim in the pool, pampering yourself at the spa, or savoring a delicious meal at one of the on-site restaurants. This day is all about relaxation and enjoying the beautiful surroundings at your own pace.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 10, location: 'Safari at Shimba Hills National Reserve', mainDestination: 'Shimba Hills National Reserve', nights: 1, hotel: 'Diani Sea Resort', activity: `This day brings a touch of adventure as you head to Shimba Hills National Reserve for a safari. Here, you’ll spot elephants, sable antelopes, and other wildlife amidst the lush, hilly landscape. A visit to Sheldrick Falls is a must before you return to your resort for a relaxing evening.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 11, location: 'Cultural Experience & Wellness', mainDestination: 'Ukunda (Town & Beach)', nights: 1, hotel: 'Diani Sea Resort', activity: `On this day, immerse yourself in local culture with a visit to a nearby Mijikenda village, where you’ll learn about traditional customs and way of life. After a cultural morning, you'll spend the afternoon indulging in spa treatments and wellness activities back at your resort, ensuring complete relaxation.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 12, location: 'Leisure & Departure', mainDestination: 'Jomo Kenyatta International Airport (Nairobi)', nights: 1, hotel: '', activity: `Your final day on the South Coast can be spent at leisure, soaking up the last of the sun on Diani Beach or enjoying the resort’s luxurious amenities. After checking out, you’ll transfer to the airport, bringing your unforgettable luxury escape to a close.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      
     
    ],
whatToExpect:[
   "Arrive in Nairobi and transfer to Mombasa, where you’ll check into your beachfront hotel and start your coastal escape with relaxation and ocean views.",
  "Discover Mombasa’s rich history with visits to Fort Jesus, Old Town, spice markets, and Haller Park for wildlife encounters.",
  "Enjoy marine adventures at Mombasa Marine Park, relax on Bamburi and Nyali beaches, and unwind with a spa evening.",
  "Experience a scenic boat ride at Mtwapa Creek followed by a delicious seafood lunch and a serene beachside evening.",
  "Travel to Diani Beach, one of Africa’s best beaches, with time for relaxation, shopping, or exploring local markets.",
  "Sail to Wasini Island and Kisite Marine Park for snorkeling among coral reefs, dolphin spotting, and a fresh seafood feast.",
  "Spend a full day of leisure at Diani Beach, enjoying watersports, kite surfing, or simply relaxing on the pristine sands.",
  "Take a day trip to Funzi Island with a mangrove boat ride, beach relaxation, and cultural village explorations.",
  "Unwind with a free day at your resort—swimming, spa indulgence, or seaside walks at your own pace.",
  "Head inland to Shimba Hills National Reserve for a safari with elephants, rare sable antelopes, and a visit to Sheldrick Falls.",
  "Immerse yourself in local Mijikenda culture with a village visit, followed by an afternoon of wellness and spa treatments.",
  "Conclude your luxury escape with a final morning of leisure before transferring back to Nairobi for your departure."


],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '4-day-safari-to-awe-inspiring-landscapes-of-mara-in-jeep',
    title: `4-Day Safari to Awe-Inspiring Landscapes of Mara in Jeep`,
    location: 'Kenya',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 7500,
    rating: 4.9,
    reviews: 2958,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 7500,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `You'll embark on a captivating 4-day safari to the mesmerizing landscapes of the Masai Mara. Your adventure begins with a thrilling ride in a 4x4 Land Cruiser, providing both comfort and access to the park's interior. You'll experience the beauty of Mara from above with two scenic flights, adding a unique perspective to your journey. You will elevate your safari with an unforgettable hot air balloon ride, allowing you to witness the breathtaking sunrise and abundant wildlife below.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury plus tour",
          description: "This luxury plus tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request changes to this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you. However, wildlife viewing activities are run by the lodges/camps and will be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour."
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
        activities: "game drives & hot air balloon safari",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle & air transfer"

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
      "title": "Hot air balloon safari",
      "subtitle": ""
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport can be arranged for an extra cost",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
      { day: 1, location: 'Arrival in Nairobi and Transfer to Keekorok Airstrip', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `Upon your arrival in Nairobi, our representative will welcome you and assist with your transfer to Wilson Airport. From there, you will board a flight to Keekorok Airstrip in the heart of the Masai Mara. Upon landing, you'll be greeted by our local team and transferred to your chosen accommodation. You will take the rest of the day to relax, soak in the surroundings, and prepare for an exciting adventure.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Hot Air Balloon Safari and Masai Mara National Reserve Exploration', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `You will wake up early for a thrilling hot air balloon safari over the expansive landscapes of the Masai Mara. As you soar above the savannah, you will witness the breathtaking sunrise and the abundant wildlife below. After your descent, ou will enjoy a sumptuous bush breakfast in the wild. The remainder of the day will be dedicated to game drives, providing ample opportunities to spot the diverse flora and fauna of the Masai Mara.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Cultural Experience-Masai Village Visit', mainDestination: 'Maasai Village (Kenya)', nights: 1, hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `You will embark on a cultural journey as you visit a Maasai village on the third day. You will gain insights into the traditional lifestyle, customs, and rituals of the Maasai people. You will engage in cultural exchanges, witness traditional dances, and explore the vibrant community. This immersive experience offers a unique perspective on the rich heritage of the Maasai Mara. In the afternoon, you will enjoy additional game drives to further explore the reserve and spot wildlife.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 4, location: 'Keekorok Airstrip to Nairobi', mainDestination: 'Nairobi', nights: 1, hotel: '', activity: `On your final day, after a leisurely morning and perhaps a last-minute game drive, you will be transferred to Keekorok Airstrip for your return flight to Nairobi Wilson Airport. As you depart from the Masai Mara, you'll carry with you the memories of an unforgettable safari adventure. Upon arrival in Nairobi, our team will ensure your smooth transfer to your next destination or your departing flight.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
  
     
    ],
whatToExpect:[
"Arrive in Nairobi and fly over Kenya’s scenic landscapes to the Masai Mara, then settle into your luxury tented camp in the wilderness.",
  
  "Relax on your first afternoon, soaking in the sounds of nature and breathtaking views from your camp.",
  
  "Float at sunrise on a hot air balloon safari, spotting wildlife from above before enjoying a bush breakfast in the wild.",
  
  "Embark on thrilling game drives across the Mara, with chances to see the Big Five and countless other species.",
  
  "Visit a Maasai village for an authentic cultural experience, witnessing traditional dances and daily life.",
  
  "End your safari with a final game drive or relaxed morning before flying back to Nairobi with unforgettable memories."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '10-day-kenyas-wildest-elegance-an-ultra-luxury-safari',
    title: `10-Day Kenya's Wildest Elegance - an Ultra-Luxury Safari`,
    location: 'Kenya',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 15000,
    rating: 5,
    reviews: 1350,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 15000,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Embark on a one-of-a-kind luxury-filled adventure through Kenya’s most stunning destinations, blending thrilling wildlife encounters with indulgent stays at top-tier lodges with safari flight transfers. Explore the remote wilderness of Meru National Park, the unique wildlife of Samburu National Reserve, and the serene beauty of Solio Ranch and Conservancy, where you can walk, bike, or ride horseback. End in the iconic Masai Mara, with breathtaking game drives and a magical hot-air balloon ride.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury plus tour",
          description: "This luxury plus tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request changes to this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Private tour",
          description: "This tour will be organized exclusively for you. However, wildlife viewing activities are run by the lodges/camps and will be shared with others."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for solo travelers",
          description: "Solo travelers can book this private tour."
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
        activities: "game drives, evening/night game drives, walking safaris (with an armed guide) & hot air balloon safari",
        gameVehicle: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle",
        gettingThere: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle"

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
      "title": "Hot air balloon safari",
      "subtitle": ""
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport can be arranged for an extra cost",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
      { day: 1, location: 'Journey to the Untamed Beauty of Meru', mainDestination: 'Meru National Park', nights: 1, hotel: 'Elewana Elsas Kopje Meru', activity: `Your safari adventure begins as your our team member greets you as you arrive at Nairobi Jomo Kenyatta Airport or your Nairobi hotel. You will be transferred to Nairobi’s Wilson Airstrip for a scenic flight to Meru National Park. Upon landing at Kinna Airstrip, your lodge or camp’s guide will welcome you and transfer you to your accommodations. Perched in a prime location, your lodge offers panoramic views and luxurious amenities, including infinity pools and farm-to-table dining.

In the afternoon, embark on your first game drive through Meru’s varied landscapes. Home to over 300 bird species and an array of wildlife, including elephants, hippos, and the rare Grevy’s zebra, the park also houses a rhino sanctuary renowned for its conservation success. End the day with a sundowner overlooking the plains, followed by a gourmet dinner under the stars. Relax in the comfort of your lodge, surrounded by the tranquil sounds of nature.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 2, location: 'Discovering Wildlife and Legacy in Meru', mainDestination: 'Meru National Park', nights: 1, hotel: 'Elewana Elsas Kopje Meru', activity: `Begin your morning with a game drive, exploring deeper into the park’s rich ecosystems. Meru National Park is famously the site where George Adamson reintroduced lions to the wild, a story immortalized in the movie Born Free. As you traverse the park, you may spot lions, cheetahs, and herds of buffalos alongside the breathtaking scenery of rivers and open savannahs. On your way back, visit the Elsa Memorial, which is dedicated to the iconic lioness Elsa. Return to your lodge or camp for a leisurely lunch and some relaxation.

In the afternoon, participate in a guided walking safari, where you’ll learn about the park’s smaller inhabitants, from vibrant insects to unique flora. This immersive experience allows you to connect with the subtleties of the ecosystem. For the adventurous, opt for a night game drive to observe nocturnal wildlife such as leopards and bush babies. Conclude the day with an exquisite dinner back at your lodge, reflecting on the wonders of Meru.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 3, location: 'Into the Heart of Samburus Wilderness', mainDestination: 'Samburu National Reserve', nights: 1, hotel: 'Sasaab Camp', activity: `After breakfast, transfer to Kinna Airstrip for your flight to Kalama Airstrip in Samburu National Reserve. This rugged reserve, covering 165 square kilometers, is defined by its arid landscapes and the life-giving Ewaso Ng’iro River. Upon arrival, your lodge or camp’s staff will greet you and transfer you to your accommodation. Designed to blend seamlessly with its surroundings, your lodge offers eco-luxury at its finest, complete with stunning views and exceptional service. Savor a delectable lunch before preparing for your afternoon adventure.

Embark on a game drive to discover Samburu’s famed "Special Five" - Grevy’s zebra, reticulated giraffe, Somali ostrich, Beisa oryx, and gerenuk. These unique species thrive in the reserve’s arid environment. Your guide will share fascinating insights into the region’s flora, fauna, and conservation initiatives. As the sun sets, enjoy a sundowner at a scenic spot, followed by an elegant dinner under a canopy of stars back at your lodge.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 4, location: 'Unique Wildlife and Vibrant Traditions of Samburu', mainDestination: 'Samburu National Reserve', nights: 1, hotel: 'Sasaab Camp', activity: `Start your day with an early morning game drive when the reserve’s wildlife is most active. Elephants often gather along the Ewaso Ng’iro River, and you may also spot predators like cheetahs or leopards on the hunt. Afterward, visit a traditional Samburu village to experience the vibrant culture of the Samburu people. Learn about their beadwork, livestock practices, and deep connection to the land. Return to your lodge or camp for a sumptuous lunch and some downtime.

In the afternoon, embark on another game drive to explore Samburu’s stunning landscapes and diverse wildlife. Your guide’s expertise will help you uncover hidden treasures, from secret waterholes to rare sightings. Conclude the day with a sundowner before enjoying a gourmet dinner back at your lodge or camp. Relax and recount the day’s adventures as the sounds of the bush lull you to sleep.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 5, location: 'Exploration of the Wilderness of the Solio Conservancy', mainDestination: 'Solio Ranch (Laikipia Plateau)', nights: 1, hotel: 'Solio Lodge', activity: `Start your journey with a scenic flight from Sasaab Airstrip to Solio Lodge, where the breathtaking landscapes of the Solio Game Reserve await you. Upon arrival, settle into the luxurious surroundings of the lodge and enjoy a delicious lunch while soaking in the stunning views of Mount Kenya. After some relaxation, embark on your first guided game drive through the reserve, renowned for its impressive rhino population and abundant wildlife. Witness herds of zebras, giraffes, and antelopes while your expert guide provides fascinating insights into the ecosystem.

As the day winds down, experience the magic of an African sunset with a sundowner in a serene spot amidst the wilderness. Capture the golden hues of the savannah and the majestic silhouette of rhinos in the distance before returning to the lodge for a gourmet dinner under the stars. Relish the cozy ambiance and impeccable hospitality of Solio Lodge as you unwind for the night.`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 6, location: 'Horseback Riding and Walking Safari Adventures in Solio', mainDestination: 'Solio Ranch (Laikipia Plateau)', nights: 1, hotel: 'Solio Lodge', activity: `Begin your day with an exhilarating horseback ride across the open savannah. Feel the freedom of riding alongside zebras and gazelles, all while taking in the morning’s fresh air and the tranquility of the reserve. Afterward, return to the lodge for a hearty lunch and some leisure time by the pool, where you can relax and cool off while enjoying the breathtaking views of the landscape.

In the afternoon, choose between a guided walking safari or another game drive. A walking safari allows you to explore the reserve’s beauty on foot, connecting you more intimately with nature as you track animal footprints and observe smaller wildlife. Alternatively, another game drive lets you delve deeper into the vast reserve to seek out animals you may have missed the previous day. Conclude the day with a sumptuous dinner back at the lodge, reflecting on your unforgettable Solio adventure.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 7, location: 'Discover the Legendary Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `After breakfast, transfer to the nearby airstrip for your flight to Masai Mara via Kichwa Tembo Airstrip. Spanning 1,510 square kilometers, the Masai Mara is renowned for its incredible wildlife density and the annual great migration. Upon arrival, your lodge or camp’s staff will escort you to your accommodations, where luxury meets wilderness. Settle into your spacious tent or suite, complete with private decks offering uninterrupted views of the Mara. Enjoy a gourmet lunch, followed by a rejuvenating 30-minute massage.

In the afternoon, head out on a game drive across the Mara’s iconic plains, seeking out its abundant wildlife. From lions lounging under acacia trees to elephants grazing in the distance, every moment is a photographer’s dream. Return to your lodge or camp for a sundowner, where the golden hues of the sunset paint the savannah. Dinner will be an elegant affair, celebrating the flavors of Africa in a stunning setting.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 8, location: `Soaring Above the Masai Mara's Golden Plains`, mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `Awaken early for a hot-air balloon safari, one of the most magical ways to experience the Masai Mara. As you glide above the plains, watch the sunrise illuminate the landscape and spot herds of animals below. Upon landing, enjoy a bush breakfast complete with champagne, set amidst the natural beauty of the Mara. Afterward, embark on a morning game drive to explore more of the reserve’s diverse habitats before returning to your lodge or camp for lunch.

In the afternoon, take a guided walking safari to uncover the Mara’s smaller wonders, from colorful birds to unique plant species. Your guide will provide fascinating insights into the interconnectedness of the ecosystem. Conclude the day with a sundowner and a gourmet dinner back at your lodge or camp, savoring the luxury and tranquility of your surroundings.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
      { day: 9, location: 'Unveiling More Wonders of the Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: 1, hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `Begin the day with a morning game drive, delving deeper into the Mara’s vast expanse. With over 95 species of mammals and 570 bird species, the Mara offers endless opportunities for discovery. Return to your lodge or camp for a leisurely lunch, taking time to relax and enjoy the premium facilities, such as the pool or your private deck.

In the afternoon, venture out for another game drive, focusing on areas known for elusive species like leopards and hyenas. As the sun sets, your guide will lead you to a vantage point for breathtaking views of the savannah bathed in golden light. Return to your lodge or camp for dinner, a culinary delight that perfectly caps off another day in this extraordinary reserve`, image: 'Light aircraft flying over the winding channels of the Okavango Delta' },
      { day: 10, location: 'Farewell to Kenya', mainDestination: 'Masai Mara National Reserve', nights: 0, hotel: '', activity: `After breakfast, lodge or camp staff will transfer you to Amboseli Airstrip for your flight back to Nairobi Wilson Airport. Upon arrival, Karla Safari Adventure staff will meet you and assist with your transfer to your hotel or onward flight at Jomo Kenyatta International Airport. Reflect on the unforgettable experiences, from iconic wildlife sightings to luxurious accommodations, as you prepare to carry the magic of Kenya with you into your next journey.`, image: 'Couple enjoying a peaceful mokoro ride in the Okavango Delta' },
    
    ],
whatToExpect:[
 "Start your adventure in Meru National Park with scenic flights, luxury lodges, and game drives among elephants, rhinos, hippos, and the rare Grevy’s zebra.",
  "Explore Meru’s legacy with visits to Elsa’s Memorial, thrilling game drives in lion country, and guided walking safaris revealing the park’s hidden gems. Optional night drives unveil elusive nocturnal wildlife.",
  "Fly into Samburu National Reserve for eco-luxury stays, encounters with the unique 'Special Five,' and sunset game drives along the life-giving Ewaso Ng’iro River.", 
  "Experience Samburu’s vibrant traditions with a cultural village visit, combined with game drives where elephants, cheetahs, and leopards roam across striking arid landscapes.",  
  "Discover the Solio Conservancy, famed for its rhino sanctuary and dramatic views of Mount Kenya. Enjoy guided drives, sundowners, and luxurious relaxation at Solio Lodge.",
  "Take on horseback rides across open savannahs, guided walking safaris, or game drives in Solio, connecting more intimately with wildlife and nature.",  
  "Fly to the world-famous Masai Mara, settling into luxury tents with sweeping views, followed by game drives across the iconic plains teeming with lions and elephants.",  
  "Soar at sunrise in a hot-air balloon over the Mara, enjoy champagne bush breakfasts, and embark on walking safaris uncovering the reserve’s smaller wonders.",  
  "Delve deeper into the Masai Mara with immersive morning and afternoon game drives, seeking out elusive leopards, hyenas, and the countless bird species that thrive here.",  
  "Conclude your safari with a final breakfast in the Mara before flying back to Nairobi, carrying memories of luxury, culture, and thrilling wildlife encounters."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '12-day-luxury-honeymoon-safari-and-beach-holiday',
    title: `12-Day Luxury Honeymoon Safari and Beach Holiday in Tanzania`,
    location: 'Tanzania',
    duration: '12 Days / 11 Nights',
    pricePerPerson: 11500,
    rating: 5.0,
    reviews: 3320,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury plus', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 11500,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Tanzania is the ultimate destination for an African honeymoon, offering a perfect blend of safari and beach experiences. With stunning beachside retreats just a short flight away from national parks teeming with the Big Five and thrilling predator encounters - it has it all. Your Tanzania honeymoon should be an unforgettable and flawless experience. With our deep understanding of the country and decades of travel planning expertise, we guarantee that it will be nothing short of perfect.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury tour",
          description: "This luxury tour uses lodges and resorts."
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
          title: "Not for solo travelers",
          description: "Solo travelers cannot book this private tour."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 18 years",
          description: "The minimum age for this tour is 18 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives, boat trip & beach time",
        gameVehicle: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle",
        gettingThere: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO )",
      endLocation: "Zanzibar", 
      endAirport: " Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport can be arranged for an extra cost",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arrival - Arusha', mainDestination: 'Arusha (City)', nights: '1', hotel: 'Gran Meliá Arusha', activity: 'Upon your arrival at Kilimanjaro International Airport (please provide your arrival time in advance), you will be met and transferred to Gran Melia Hotel, where your accommodation is reserved on a bed and breakfast basis. Should you require assistance with arranging your international flight, please let us know in advance, and we can make the necessary arrangements.', image: 'Maasai Mara' },
{ day: 2, location: 'Arusha - Tarangire', mainDestination: 'Tarangire National Park', nights: '1', hotel: 'Lake Manyara Kilimamoja Lodge', activity: `At 8 a.m., post-breakfast, your safari guide will collect you from the hotel and drive to Tarangire National Park. There, you'll enjoy many wildlife encounters. Your overnight stay is at Lake Manyara Kilimamoja Lodge, with provided meals (breakfast, lunch, and dinner) and 500ml drinking water bottles per person.

Tarangire, spanning 3,000 sq km, is famed for its elephants and iconic baobab trees. The park's name originates from the Tarangire River, which snakes through it. The dry season (June - November) is especially captivating as it draws vast wildlife populations to the river, offering a spectacle akin to the Serengeti. Tarangire boasts 2,000 elephants and 500 bird species.`, image: 'Maasai Mara' },
{ day: 3, location: 'Tarangire - Serengeti', mainDestination: 'Serengeti National Park', nights: '1', hotel: 'Four Seasons Safari Lodge Serengeti', activity: `After breakfast, embark on a journey to Serengeti National Park, accompanied by picnic lunches for the day's adventure. Enjoy an afternoon game drive, followed by dinner and your overnight stay at Serengeti Four Seasons Lodge. The provided meals include breakfast, lunch, and dinner, and each person will receive 500ml of drinking water.

Serengeti National Park is a natural wonder, housing an estimated three million large animals. Most of these creatures partake in a seasonal migration, a spectacle of nature. The park spans 14,763 sq km, and its name, Serengeti, is derived from the Maasai word 'Siringet,' signifying endless plains.`, image: 'Maasai Mara' },
{ day: 4, location: 'Serengeti', mainDestination: 'Serengeti National Park', nights: '1', hotel: 'Four Seasons Safari Lodge Serengeti', activity: `Following breakfast, indulge in a full day of exploration in various regions of the Serengeti. Your overnight stay will once again be at a Serengeti lodge. The day's meals, including breakfast, lunch, and dinner, are provided, and each person will be supplied with 500ml of drinking water.

The Central Serengeti is a prime location for exceptional game viewing throughout the year, thanks to its abundant resident wildlife. The Seronera River Valley in the Central Serengeti, in particular, is a must-see destination on any safari, regardless of the specific month of travel. Game viewing in the Central Serengeti reaches its peak during the dry season (June - November) when resident animals congregate in the area due to the scarcity of water on the plains. Resident herbivores include impala, buffalo, hippo, warthog, topi, hartebeest, and giraffe, while resident carnivores include lion and leopard.`, image: 'maasai mara' },
{ day: 5, location: 'Serengeti - Ngorongoro', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: 'Ngorongoro Lodge Meliá Collection', activity: `Spend the first half of the day in the Serengeti, and after lunch, embark on a drive to the rim of Ngorongoro Crater, where you will overnight at Ngorongoro Melia Lodge. Your meals for the day, including breakfast, lunch, and dinner, are provided, and each person will receive 500ml of drinking water.

Within just an hour's game drive radius from Seronera, there are several documented resident lion prides. During the dry season, these prides gradually shift west and north within their territories, concentrating in the central region of the park. The dry season is an excellent time for lion viewing in the Central Serengeti. Additionally, the Central Serengeti is among the best areas in Africa to spot the elusive leopard. You may be fortunate enough to encounter this magnificent cat perched in the branches of the sausage trees that line the banks of the Seronera River.`, image: 'maasai mara' },
{ day: 6, location: 'Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: 'Zanzibar Serena Hotel', activity: `Begin with breakfast at 6:30 a.m., then descend into the Ngorongoro Crater for a crater game tour. After lunch, return to Arusha and head to Kilimanjaro Airport for your flight to Zanzibar. Upon arrival, you'll be met and transferred to Zanzibar Serena Inn, where you'll overnight with breakfast included. Your meals for the day include breakfast and lunch, and each person will receive daily supplies of drinking water.

The Ngorongoro Crater is the largest intact crater globally. It formed about 2 million years ago when the Ngorongoro volcano erupted, leading to the collapse of its walls. This created a natural enclosure with towering walls, now standing at 600 meters tall. Today, the Ngorongoro Crater spans over 19 kilometers in width and features diverse landscapes, including expansive acacia forests, hippo-filled swamps, and open grasslands - all of these various habitats are home to a rich array of wildlife.`, image: 'Maasai Mara' },
{ day: 7, location: 'Zanzibar', mainDestination: 'Zanzibar Island (Tanzania Beaches)', nights: '1', hotel: 'Emerald Zanzibar Resort & Spa', activity: `At 9 am, you will be picked up from your hotel for a Stone Tour, a journey through the legendary Stone Town where history seems frozen in time. The tour includes visits to notable landmarks such as the House of Wonders, the Palace Museum (People's Palace), Dr. Livingstone's House, and the Arab Fort, among others. It provides a captivating glimpse into the heart of Zanzibar. You'll also explore Zanzibar's vibrant market, wander through winding alleyways, admire intricately carved and adorned doors, visit two cathedrals, and encounter numerous mosques.

Following lunch, you will be transported by boat to Prison Island, where you can observe turtles and enjoy snorkeling. Later, after all the excursions, you will drive to Emerald Zanzibar now the Mora Zanzibar in all-inclusive resort.`, image: 'Maasai Mara' },
{ day: '8-11', location: 'Beach Holiday', mainDestination: 'Matemwe Beach (Zanzibar)', nights: '3', hotel: 'Emerald Zanzibar Resort & Spa', activity: 'Savor a leisurely day at the beach, unwinding and taking in the serene surroundings. Your overnight stay will be at Emerald Zanzibar now The Mora Zanzibar providing ample time to relish your holiday on the exquisite beaches of Zanzibar and rejuvenate your body after the bush safari. Cherish the moments of your once-in-a-lifetime honeymoon safari in Tanzania. Hakuna Matata.', image: 'Maasai Mara' },
{ day: 12, location: 'Departure', mainDestination: 'Zanzibar Airport (Zanzibar)', nights: '0', hotel: '', activity: `Following breakfast, you will be picked up (time to be confirmed) and transferred to Zanzibar Airport for your flight back home, marking the conclusion of our services.`, image: 'Maasai Mara' },
    ],
whatToExpect:[
  "Arrive in Arusha, settle into your luxury hotel, and prepare for the adventure ahead with views of Mount Meru and warm Tanzanian hospitality.",
  "Embark on your first safari in Tarangire National Park, famed for vast elephant herds, towering baobab trees, and rich birdlife along the Tarangire River.",
  "Head to the legendary Serengeti for thrilling game drives across endless plains, home to lions, leopards, and the spectacle of the Great Migration.",
  "Spend a full day exploring Serengeti’s Central region, with exceptional wildlife viewing year-round and chances to spot resident predators and grazing herds in the Seronera Valley.",
  "Journey to the rim of the Ngorongoro Crater, a UNESCO World Heritage Site, where dramatic landscapes and abundant wildlife create an unforgettable safari backdrop.",
  "Descend into Ngorongoro Crater for a half-day game drive before flying to Zanzibar, combining safari thrills with island relaxation on the Indian Ocean coast.",
  "Discover Stone Town’s rich history with guided tours of spice markets, historic landmarks, and winding alleys, followed by snorkeling and giant tortoise encounters at Prison Island.",
  "Unwind on Matemwe Beach with days of pure relaxation—swimming, sunbathing, and enjoying all-inclusive luxury at your resort. The perfect finale to your safari and island escape."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '3-day-luxury-safari-in-the-great-masai-mara-reserve',
    title: `3-Day Luxury Safari in the Great Masai Mara Reserve`,
    location: 'Kenya',
    duration: '12 Days / 11 Nights',
    pricePerPerson: 3800,
    rating: 4.8,
    reviews: 3528,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 3800,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Embark on a 3-day, 2-night private luxury safari to the renowned Masai Mara National Reserve. Departing daily from Nairobi, this exclusive experience offers unmatched comfort and adventure. Explore the reserve’s vast plains, home to the Big Five and the iconic great migration, with expertly guided game drives. Available year-round, this unforgettable journey blends wildlife, culture, and luxury for an unparalleled experience.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury Plus tour",
          description: "This luxury plus tour uses tented camps."
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
          description: "Solo travelers cannot book this private tour."
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
        activities: "game drives",
        gameVehicle: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle",
        gettingThere: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: " Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: " Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
      { day: 1, location: 'Nairobi - Masai Mara National Reserve', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: 'Elewana Sand River Masai Mara', activity: `After a hearty breakfast, your driver-guide reports to your hotel for the start of the safari. Depart for a picturesque drive, descending the Great Rift Valley and onwards to Masai Mara, Kenya's famous game reserve. Stop briefly en route at the Great Rift Valley viewpoint to enjoy the stunning views of the enormous valley system said to be visible from outer space. You'll arrive in Masai Mara in time for lunch.

After lunch, we will have an afternoon game drive which will allow us to spot the magnificent wildlife in the park. The reserve is known for providing excellent predator sightings thanks to its relatively large population of lions, cheetahs and leopards. Bordering Tanzania, the Mara is in the Northern extension of Serengeti and forms a wildlife corridor between the two countries. You'll return to the camp for dinner and an overnight stay.`, image: 'Maasai Mara' },
     { day: 2, location: 'Masai Mara National Reserve', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: 'Elewana Sand River Masai Mara', activity: `Enjoy an early morning and evening game drive to absorb the enormity of the Masai Mara National Reserve. In this country of breathtaking vistas, you will see its vast assemblages of plains game together with their associated predators. Be ready to look for buffalo, black rhino, hippopotamus, leopard, cheetah, lion, common zebra, Coke's hartebeest, white-bearded gnu, oribi, warthog, and Thompson's and Grant's gazelle. You will have an optional visit to the Maasai Cultural Village. This one-hour visit is a chance to interact with the Maasai, get a glimpse into their culture and unique way of life, and see firsthand some of their customs and practices. All meals and your overnight stay are at the camp.`, image: 'Maasai Mara' },
     { day: 3, location: 'Masai Mara - Nairobi', mainDestination: 'Nairobi (City)', nights: '', hotel: '', activity: 'After breakfast, check out and depart by road for Nairobi with a packed picnic lunch box. Transfer either to Jomo Kenyatta International Airport for your international departure or to your residence or hotel of stay in Nairobi (for your own account).', image: 'Maasai Mara' },
 

  ],
whatToExpect:[
    "Scenic drive from Nairobi to Masai Mara, including a stop at the Great Rift Valley viewpoint with breathtaking panoramic landscapes.",
  "Afternoon and full-day game drives in the Masai Mara, home to lions, cheetahs, leopards, elephants, rhinos, and abundant plains game.",
  "Opportunities to witness the famous Mara-Serengeti wildlife corridor and seasonal Great Migration (depending on travel time).",
  "Optional cultural visit to a Maasai village for an authentic glimpse into their traditions, lifestyle, and customs.",
  "Luxurious accommodation at Elewana Sand River Masai Mara with delicious meals and serene wilderness surroundings.",
  "Return journey to Nairobi with a packed lunch, concluding with either a transfer to your hotel or Jomo Kenyatta International Airport."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: '8-day-unmatched-elegance-crown-jewels-of-kenya-safari',
    title: `8-Day Unmatched Elegance - Crown Jewels of Kenya Safari`,
    location: 'Kenya',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 13000,
    rating: 5,
    reviews: 6540,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 13000,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This elite luxury safari takes you through Kenya’s most iconic and diverse landscapes—from the rugged wilderness of Meru to the arid beauty of Samburu and the wildlife-rich plains of the Masai Mara. Travel in comfort as you explore these remarkable regions, encountering unforgettable scenery and wildlife. Enjoy all-inclusive stays at Kenya’s finest lodges, featuring gourmet dining, spa treatments, and exceptional personalized service.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury Plus tour",
          description: "This luxury plus tour uses tented camps."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 18 years",
          description: "The minimum age for this tour is 18 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives, evening/night game drives & walking safaris (with an armed guide)",
        gameVehicle: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle",
        gettingThere: "open-sided 4x4 vehicle & pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: " Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: " Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Journey to the Untamed Beauty of Meru', mainDestination: 'Meru National Park', nights: '1', hotel: `Elewana Elsa's Kopje Meru`, activity: `Welcome to Nairobi! A Karla Safari Adventures team member will warmly welcome you at the Jomo Kenyatta International Airport or your Nairobi hotel and your adventure begins with a scenic drive to Meru National Park. This lesser-visited gem spans over 870 square kilometers and features diverse habitats, including savannahs, swamps, and riverine forests. Upon landing at Kinna Airstrip, your lodge or camp’s guide will welcome you and transfer you to your accommodations. Perched in a prime location, your lodge offers panoramic views and luxurious amenities, including infinity pools and farm-to-table dining.

In the afternoon, embark on your first game drive through Meru’s varied landscapes. Home to over 300 bird species and an array of wildlife, including elephants, hippos, and the rare Grevy’s zebra, the park also houses a rhino sanctuary renowned for its conservation success. End the day with a sundowner overlooking the plains, followed by a gourmet dinner under the stars.`, image: 'Maasai Mara' },
{ day: 2, location: 'Discovering Wildlife and Legacy in Meru', mainDestination: 'Meru National Park', nights: '1', hotel: `Elewana Elsa's Kopje Meru`, activity: `Begin your morning with a game drive, exploring deeper into the park’s rich ecosystems. Meru National Park is famously the site where George Adamson reintroduced lions to the wild, a story immortalized in the movie Born Free. As you traverse the park, you may spot lions, cheetahs, and herds of buffalo, alongside the breathtaking scenery of rivers and open savannahs. On your way back, visit the Elsa Memorial, dedicated to the iconic lioness Elsa. Return to your lodge or camp for a leisurely lunch and some relaxation.

In the afternoon, participate in a guided walking safari, where you’ll learn about the park’s smaller inhabitants, from vibrant insects to unique flora. This immersive experience allows you to connect with the subtleties of the ecosystem. Return to your lodge or camp for dinner. After, enjoy a night game drive to observe nocturnal wildlife such as leopards and bush babies. Conclude the day with an exquisite dinner back at your lodge, reflecting on the wonders of Meru.`, image: 'Maasai Mara' },
{ day: 3, location: `Into the Heart of Samburu's Wilderness`, mainDestination: 'Samburu National Reserve', nights: '1', hotel: 'Sasaab Camp', activity: `After breakfast, take a 3 hour scenic drive to your next exciting location-Samburu National Reserve. This rugged reserve, covering 165 square kilometers, is defined by its arid landscapes and the life-giving Ewaso Ng’iro River. Upon arrival, your lodge or camp’s staff will greet you and transfer you to your accommodations. Designed to blend seamlessly with its surroundings, your lodge offers eco-luxury at its finest, complete with stunning views and exceptional service. Savor a delectable lunch before preparing for your afternoon adventure.

Embark on a game drive to discover Samburu’s famed "Special Five": Grevy’s zebra, reticulated giraffe, Somali ostrich, Beisa oryx, and gerenuk. These unique species thrive in the reserve’s arid environment. Your guide will share fascinating insights into the region’s flora, fauna, and conservation initiatives. As the sun sets, enjoy a sundowner, followed by an elegant dinner under a canopy of stars back at your lodge or camp.`, image: 'Maasai Mara' },
{ day: 4, location: 'Unique Wildlife and Vibrant Traditions of Samburu', mainDestination: 'Samburu National Reserve', nights: '1', hotel: 'Sasaab Camp', activity: `Start your day with an early morning game drive, when the reserve’s wildlife is most active. Elephants often gather along the Ewaso Ng’iro River, and you may also spot predators like cheetahs or leopards on the hunt. Afterward, visit a traditional Samburu village to experience the vibrant culture of the Samburu people. Learn about their beadwork, livestock practices, and deep connection to the land. Return to your lodge or camp for a sumptuous lunch and some downtime.

In the afternoon, embark on another game drive to explore Samburu’s stunning landscapes and diverse wildlife. Your guide’s expertise will help you uncover hidden treasures, from secret waterholes to rare sightings. Conclude the day with a sundowner before enjoying a gourmet dinner back at your lodge or camp. Relax and recount the day’s adventures as the sounds of the bush lull you to sleep.`, image: 'Maasai Mara' },
{ day: 5, location: 'Departure for the Legendary Masai Mara National Reserve', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `After breakfast, transfer to to the local safari Airstrip for your flight to Masai Mara via Kichwa Tembo Airstrip. Spanning 1,510 square kilometers, the Masai Mara is renowned for its incredible wildlife density and the annual great migration. Upon arrival, your lodge or camp’s staff will escort you to your accommodations, where luxury meets wilderness. Settle into your spacious tent or suite, complete with private decks offering uninterrupted views of the Mara. Enjoy a gourmet lunch, followed by a rejuvenating 30-minute massage.

In the afternoon, head out on a game drive across the Mara’s iconic plains, seeking its abundant wildlife. From lions lounging under acacia trees to elephants grazing in the distance, every moment is a photographer’s dream. Return to your lodge or camp for a sundowner, where the golden hues of the sunset paint the savannah. Dinner will be an elegant affair, celebrating the flavors of Africa in a stunning setting.`, image: 'Maasai Mara' },
{ day: 6, location: `Soaring above the Mara's Golden Plains`, mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `Another day in the legendary Masai Mara starts with a delicious breakfast. Afterwards embark on a morning game drive to explore more of the reserve’s diverse habitats before returning to your lodge or camp for lunch.

In the afternoon, take a guided walking safari to uncover the Mara’s smaller wonders, from colorful birds to unique plant species. Your guide will provide fascinating insights into the interconnectedness of the ecosystem. Conclude the day with a sundowner and a gourmet dinner back at your lodge or camp, savoring the luxury and tranquility of your surroundings.`, image: 'Maasai Mara' },
{ day: 7, location: 'Discovering More Wonders of the Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: '&Beyond Kichwa Tembo Tented Camp', activity: `Begin the day with a morning game drive, delving deeper into the Mara’s vast expanse. With over 95 species of mammals and 570 bird species, the Mara offers endless opportunities for discovery. Return to your lodge or camp for a leisurely lunch, taking time to relax and enjoy the premium facilities, such as the pool or your private deck.

In the afternoon, venture out for another game drive, focusing on areas known for elusive species like leopards and hyenas. As the sun sets, your guide will lead you to a vantage point for breathtaking views of the savannah bathed in golden light. Return to your lodge or camp for dinner, a culinary delight that perfectly caps off another day in this extraordinary reserve.`, image: 'Maasai Mara' },
{ day: 8, location: 'Farewell to Kenya', mainDestination: 'Nairobi (City)', nights: '', hotel: '', activity: 'After breakfast, the lodge or camp staff will take one last scenic drive back to Nairobi where your guide will bid farewell at your hotel or onward flight at Jomo Kenyatta International Airport. Reflect on the unforgettable experiences, from iconic wildlife sightings to luxurious accommodations, as you prepare to carry the magic of Kenya with you into your next journey.', image: 'Maasai Mara' },

  ],
whatToExpect:[
 "Enjoy a scenic road trip from Nairobi to Masai Mara with a photo stop at the iconic Great Rift Valley viewpoint.",
  "Experience thrilling afternoon and full-day game drives in the Masai Mara, encountering lions, cheetahs, leopards, elephants, rhinos, and endless plains game.",
  "Witness the Mara-Serengeti wildlife corridor and, depending on season, the breathtaking Great Migration of wildebeest and zebra.",
  "Immerse yourself in Maasai culture with an optional village visit showcasing traditions, vibrant dances, and authentic daily life.",
  "Unwind in luxury at Elewana Sand River Masai Mara, complete with gourmet dining, scenic views, and warm African hospitality.",
  "Conclude your adventure with a relaxed return to Nairobi, including a picnic lunch and transfer to your hotel or Jomo Kenyatta International Airport."


],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: '7-day-luxury-safari-kruger-national-park-south-africa',
    title: `7-Day Luxury Safari Kruger National Park South Africa`,
    location: 'South Africa',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 11245,
    rating: 5,
    reviews: 4928,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 11245,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Treat yourself to the ultimate African safari at two 5-star luxury lodges in the world-renowned Kruger National Park. The Kruger Park boasts a diversity of game viewing, including the Big Five (rhino, elephant, buffalo, lion, and leopard) and over 360 bird species. Your safari begins at the colonial-style Kings Camp in the Timbavati Private Nature Reserve and culminates with the Leopard Hills Lodge in the legendary Sabi Sand Game Reserve. This wildlife experience will leave you mesmerized!`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury Plus tour",
          description: "This luxury plus tour uses tented camps."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 12 years",
          description: "The minimum age for this tour is 12 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives, evening/night game drives, walking safaris (with an armed guide) & specialized birding ",
        gameVehicle: "open-sided 4x4 vehicle",
        gettingThere: "normal 4x4 vehicle & air transfer"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Johannesburg",
      startAirport: "O.R. Tambo Airport ",
      endLocation: "Johannesburg", 
      endAirport: "O.R. Tambo Airport ",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: `1-3`, location: 'Depart OR Tambo Airport, Johannesburg to Kings Camp, Timbavati, Kruger Park, South Africa', mainDestination: 'Timbavati Private Nature Reserve (Greater Kruger)', nights: '3', hotel: `Kings Camp`, activity: `Transfer from Johannesburg OR Tambo International Airport to the colonial-styled Kings Camp. Kings Camp is located in the Timbavati Private Nature Reserve on the western boundary of the Kruger National Park. Timbavati was created in the 1950s by a group of conservation-minded landowners who came together to protect pristine wilderness areas from destructive farming. In 1993, Timbavati's importance as a wildlife haven was recognized, and the fences between it and the Kruger National Park were removed to encourage natural migration. As a result, Kings Camp was established as a premier eco-tourism destination in South Africa. Joof Alberts purchased and renovated the property in 1995. Timbavati is a small private reserve offering highly exclusive game-viewing safaris in the Greater Kruger National Park, with only nine thatched air-conditioned suites, reflecting the charm and romance of a Colonial past. Enjoy twice-daily game drives with highly professional and trained rangers and trackers.`, image: 'Maasai Mara' },
{ day: `4-6`, location: 'Exhilarating Air transfer from Kings Camp to the exclusive Leopard Hills', mainDestination: 'Sabi Sand Private Game Reserve (Greater Kruger)', nights: '3', hotel: `Leopard Hills Lodge`, activity: `Award-winning Leopard Hills is in the renowned Sabi Sand Game Reserve, bordering the world-famous Kruger National Park. The lodge is perfectly set on a rocky outcrop, offering magnificent views over the bush and an active waterhole on the plains below. The reserve comprises over 10 000 hectares of incredibly diverse ecosystems making Leopard Hills the ideal destination to view plentiful game in their natural habitat. Here the Big Five (elephant, lion, rhino, buffalo, and leopard) abound, and viewing them nearby is their specialty. Leopard Hills carefully plans your safari around the best game viewing opportunities. The more productive times are early morning before the day's heat and late afternoon as it cools down, ensuring the sight of animal movement. A walking safari is thrilling! When the animals have retreated to the shade, you, too, get to enjoy spa treatments, time to relax at the camp, a light lunch, and a cool-off in your private plunge pool`, image: 'Maasai Mara' },
{ day: 7, location: 'Wrap up your trip with an air transfer directly from Leopard Hills', mainDestination: '', nights: '1', hotel: ``, activity: `Following an early morning game drive and then breakfast, prepare for your air transfer from Leopard Hills to Johannesburg OR Tambo International Airport to resume your homeward-bound journey. Should it suit you to overnight at a boutique hotel in Johannesburg, depending on your international route, we can arrange that as an extra. If you're keen to extend your journey, you have the option to continue exploring with Greatest Africa, discovering additional destinations such as Victoria Falls, Cape Town, or the Garden Route.`, image: 'Maasai Mara' },

  ],
whatToExpect:[
"Start your journey with a scenic transfer from Johannesburg to Kings Camp, set in the exclusive Timbavati Private Nature Reserve.",
  "Experience twice-daily game drives led by expert rangers and trackers, offering intimate encounters with Africa’s Big Five and more.",
  "Stay in elegant thatched colonial-style suites at Kings Camp, blending luxury with the charm of a bygone era.",
  "Continue by air to the award-winning Leopard Hills Lodge in the Sabi Sand Game Reserve, famed for its extraordinary leopard sightings.",
  "Enjoy morning and late afternoon safaris, as well as optional walking safaris, revealing the reserve’s diverse wildlife and ecosystems.",
  "Relax between adventures with spa treatments, gourmet dining, and private plunge pools overlooking the African bush.",
  "Conclude your safari with a final game drive and air transfer back to Johannesburg, with options to extend your journey to Cape Town, Victoria Falls, or the Garden Route."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '3-day-luxury-honeymoon-safari-to-serengeti-ngorongoro',
    title: `3-Day Luxury Honeymoon Safari to Serengeti & Ngorongoro`,
    location: 'Tanzania',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 2730,
    rating: 5,
    reviews: 5289,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2730,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Serengeti Green Tanzania welcomes you to Tanzania to enjoy an incredible 3-day/2-night luxury honeymoon safari in Serengeti National Park and visit the Ngorongoro Crater. During this safari, we will provide the following crucial facilities to make your safari even better and more comfortable: A 4x4 safari vehicle with a hatch roof, a fridge inside the vehicle, an inverter, and binoculars.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury  tour",
          description: "This luxury  tour uses tented camps."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 5 years",
          description: "The minimum age for this tour is 5 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arusha to Central Serengeti National Park', mainDestination: 'Central Serengeti National Park', nights: '1', hotel: `Serengeti Serena Safari Lodge`, activity: `Upon your arrival at the Arusha Airport, you will meet with our tour guide driver, who will have a packed lunchbox for you. We shall start our beautiful journey to Serengeti National Park for a game drive. You will enjoy a lovely game drive while taking pictures in the park. In the evening, we shall transfer you to your lodge for dinner, relaxation, and an overnight stay to enjoy your honeymoon adventure with a glass of champagne.

The Serengeti National Park is a wonder of nature shared between Tanzania and Kenya. Here, you will experience and witness the great wildlife migration involving over two million wildebeest, zebras, and antelopes migrating between these two countries. It is a vast park and home to Africa's Big Five.`, image: 'Maasai Mara' },
{ day: 2, location: 'Serengeti and Ngorongoro Crater', mainDestination: 'Central Serengeti National Park', nights: '1', hotel: `Ngorongoro Serena Safari Lodge`, activity: `After an early breakfast, we will continue with a game drive in Serengeti and enjoy a lunch box en route. You can expect to see beautiful wildlife inside the park! Once we finish the game drive in the evening, we shall transfer you to Ngorongoro for dinner, relaxation, and an overnight stay. Enjoy your honeymoon adventure while you listen to the beautiful sounds of birds.`, image: 'fallback' },
{ day: 3, location: 'Ngorongoro Crater to Arusha Airport', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: ``, activity: `After breakfast, we start our beautiful journey to the Ngorongoro Crater while carrying lunch boxes. We shall descend the crater while watching the majestic view around us. During our time in the crater, we will say cheers with some champagne and a delightful lunch. Once we finish the game drive, we shall transfer you to the Arusha Airport, where the safari ends.

Travelers visiting the Ngorongoro Conservation Area can enjoy a number of incredible and unique experiences, such as exploring the volcanic craters (one of which is the largest unbroken volcanic caldera in the world) and viewing the dense wildlife population of, among others, Africa's Big Five.`, image: 'Maasai Mara' },

  ],
whatToExpect:[
"Begin your honeymoon with a scenic drive from Arusha to the Serengeti, enjoying your first thrilling game drive on arrival.",
  "Witness the world-famous Great Migration (seasonal) and spot Africa’s Big Five in the vast Serengeti plains.",
  "Spend romantic evenings at Serena Safari Lodges, complete with champagne, fine dining, and breathtaking views.",
  "Continue your adventure with a game drive in the Serengeti before heading to the Ngorongoro highlands.",
  "Descend into the Ngorongoro Crater, the world’s largest intact caldera, home to one of the densest wildlife populations on earth.",
  "Enjoy picnic lunches in the wild, close encounters with diverse wildlife, and unforgettable honeymoon memories before returning to Arusha."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '6-day-circuit-safari-masai-mara-lake-nakuru-amboseli',
    title: `6-Day Circuit Safari Masai Mara - Lake Nakuru - Amboseli`,
    location: 'Kenya',
    duration: '6 Days / 5 Nights',
    pricePerPerson: 1390,
    rating: 4.7,
    reviews: 16245,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1390,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Sample Kenya’s renowned Masai Mara National Reserve - the new seventh wonder of the world. See the contrasting Kenyan eco-systems of Masai Mara in the southwest with its wide-open savannah grassland and rolling hills, Lake Nakuru in the Rift Valley (Central Kenya) and home to the white rhino and thousands of flamingoes in Amboseli in the South.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps and hotels."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "You can request minor changes to the accommodations and destinations of this tour."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta International Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta International Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi - Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Lenchada Tourist Camp`, activity: `On arrival, we pick you up at the airport or at your hotel, then proceed to Masai Mara with a stopover at the Great Rift Valley. We drive past Longonot and Suswa, then on to the western walls, with a stopover at Narok for re-fuelling and lunch. We arrive in the Mara in time for the afternoon game drive. Return to the budget camp for dinner and your overnight stay.`, image: 'Maasai Mara' },
{ day: 2, location: 'Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Lenchada Tourist Camp`, activity: `Spend a whole day game viewing in this jewel of a park in Kenya. Masai Mara National Reserve is rich in wildlife and exotic birds. Today, you will explore the savannah plains to catch up with the grazers. Elephant, warthog, giraffe, zebra, gazelle, buffalo, hyena, jackal and many more will be seen during your game drives. The big cats like lions, leopards, cheetahs, and wild cats are also found here, and will be seen in the fields hunting together with the scavengers. Your game viewing shall also cover areas around the Mara River for giant Nile crocodile and hippo viewing. Have your packed lunch by the Mara River as you enjoy your game viewing. This is an all-year-round arena for wildlife viewing. Dinner and overnight at budget tented camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Masai Mara - Lake Nakuru', mainDestination: 'Lake Nakuru National Park', nights: '1', hotel: `Hillcourt Resort & Spa`, activity: `Wake up very early, ready for the morning game drive inside the Masai Mara National Reserve. After the morning game drive, return to the camp for a full breakfast then depart for Lake Nakuru by road. Lunch will be served en-route. You will arrive in Nakuru in the evening. Dinner and your overnight stay will be at Hill Court Resort & Spa.`, image: 'Maasai Mara' },
{ day: 4, location: 'Nakuru - Amboseli', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Manjaro Tented Camp`, activity: `Have an early breakfast, then proceed for the adventure in Lake Nakuru National Park. This park is rich with over 350 bird species, the greater and lesser flamingo, plover, marabou stork, white pelican, and egret. The wildlife includes the white and black rhino, Rothschild's giraffe, lion, zebra, antelope, buffalo and other wild animals. Lunch will be served en-route to Amboseli National Park. You will arrive at Amboseli in time for dinner and overnight at Manjaro Tented camp or similar.`, image: 'Maasai Mara' },
{ day: 5, location: 'Amboseli', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Manjaro Tented Camp`, activity: `After an early breakfast, proceed for the adventure in the park of viewing the animals. Enjoy the spotting of the unique animals found in the beautiful, scenic park such as cheetah, lion, and leopard. A picnic lunch will be served in the park. Return to Manjaro Tented camp or similar for dinner and your overnight stay.`, image: 'Maasai Mara' },
{ day: 6, location: 'Amboseli - Nairobi', mainDestination: 'Nairobi(City)', nights: '', hotel: ``, activity: `On your last day, wake up very early to prepare for the morning game drive inside Amboseli Game Reserve. After the game drive, return to the lodge for a full breakfast, then depart for Nairobi by road. Lunch will be served en-route. You will arrive in Nairobi in the afternoon.`, image: 'Maasai Mara' },

  ],
whatToExpect:[
  "Start your adventure with a scenic drive from Nairobi through the Great Rift Valley to the world-famous Masai Mara, arriving in time for an afternoon game drive.",
  "Spend a full day exploring Masai Mara National Reserve, home to Africa’s Big Five, the Great Migration (seasonal), and incredible predators such as lions, leopards, and cheetahs.",
  "Wake up early for a sunrise game drive in Masai Mara before departing for Lake Nakuru, famous for its flamingos, rhinos, and diverse birdlife.",
  "Continue to Lake Nakuru National Park, where you’ll enjoy birdwatching and spot rare species such as Rothschild's giraffe alongside rhinos, lions, and buffalo.",
  "Journey on to Amboseli National Park, set against the backdrop of Mount Kilimanjaro, for excellent opportunities to see large elephant herds and breathtaking landscapes.",
  "Spend a full day in Amboseli spotting wildlife including elephants, lions, cheetahs, giraffes, and hundreds of bird species, with a picnic lunch inside the park.",
  "Conclude your safari with an early morning game drive in Amboseli before returning to Nairobi, filled with unforgettable safari memories."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '4-day-masai-mara-nakuru',
    title: `4-Day Masai Mara - Nakuru`,
    location: 'Kenya',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1730,
    rating: 4.8,
    reviews: 3290,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1730,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This is a three nights safari staying in a Masai Mara mid-range tented camp and Nakuru luxury camp. The safari starts from Nairobi through the Rift Valley Viewpoint to Masai Mara and Nakuru. You will have an evening game drive on your first day and a full day drive on the second day with a picnic lunch. On the third day, have a morning game drive then leave to Nakuru and be dropped off at your hotel. On the fourth day, have a morning game drive and get back to Nairobi where the safari ends.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses tented camps and hotels."
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
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
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
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta International Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta International Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi to Masai Mara National Reserve', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Enkorok Mara Camp`, activity: `You'll depart from Nairobi in the morning and drive along the floor of the Rift Valley to Masai Mara arriving at the camp in the afternoon or after lunch, depending on your timing. Enjoy afternoon game drives followed by dinner and your overnight stay at the Enkolok Mara Tented Camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Inside Masai Mara National Reserve', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Enkorok Mara Camp`, activity: `Today you'll have a full day spent exploring the park in search of the Big Five. Morning and afternoon game drives are offered. Dinner and your overnight stay will be at the camp. The Mara offers wildlife in such variety and abundance that it is difficult to believe: over 450 species of animals have been recorded here. You will easily see lions, rhinos, hippos, crocodiles, giraffes, wildebeests, zebras, buffalo, warthogs, hyenas, jackals, wild dogs, leopards, many kinds of antelopes and elephants. It is in the Mara that perhaps the most spectacular event of the natural world takes place. This is the annual migration of millions of wildebeest and zebra from the Serengeti (Tanzania) in search of water and pasture. Following on their heels are the predators of the savanna- lion, cheetah, wild dog, jackal, hyena and vulture.`, image: 'Maasai Mara' },
{ day: 3, location: 'Masai Mara National Reserve to Lake Nakuru National Park', mainDestination: 'Lake Nakuru National Park', nights: '1', hotel: `Sarova Woodlands Hotel & Spa`, activity: `After early breakfast there is optional an optional visit to a Maasai village or boat ride at cresent island at Lake Naivasha. Afterward, depart to Nakuru with a picnic lunch on the way arriving in the evening and be dropped off at your hotel for dinner and your overnight stay at Sarova Woodland.`, image: 'Maasai Mara' },
{ day: 4, location: 'Lake Nakuru National Park - Nairobi', mainDestination: 'Nairobi (City)', nights: '', hotel: ``, activity: `After an early breakfast at 6.30 am, proceed to the park where you will see a lot of flamingos among other birds [about 350 species recorded]. This is also home to the black and the white rhinoceros. The park has also been established for the protection of endangered species such as rhinos. It is also home to Columbus monkeys, leopards, giraffes, and a
variety of plain antelopes. Afterward, depart to Nairobi where you'll be arriving in the afternoon.`, image: 'Maasai Mara' },

  ],
whatToExpect:[
  "Begin your safari with a scenic drive from Nairobi through the Great Rift Valley, arriving in the Masai Mara for your first afternoon game drive.",
  "Spend a full day in Masai Mara National Reserve spotting the Big Five, witnessing the Great Migration (seasonal), and enjoying unforgettable wildlife encounters.",
  "After an early game drive or optional Maasai village visit, journey to Lake Nakuru with a picnic lunch en route, arriving in the evening.",
  "Explore Lake Nakuru National Park, famous for flamingos, rhinos, giraffes, and diverse birdlife, before returning to Nairobi in the afternoon with lasting safari memories."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '3-day-adventure-in-masai-mara',
    title: `3-Day Adventure in Masai Mara`,
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 999,
    rating: 4.6,
    reviews: 7290,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 999,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This popular 3 day Masai Mara Camping Safari departs daily from our offices in Nairobi. It is a 3-day budget camping safari to the world-famous Masai Mara National Reserve. This 3 day, 2 night Masai Mara Budget Safari departs daily and all year round for both group and private tours.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The contents of this tour can be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"

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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta International Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta International Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi - Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Lenchada Tourist Camp`, activity: `You will be met on arrival at the Jomo Kenyatta International Airport or hotel to be briefed by a company representative and then drive through the floor of the Rift Valley to the world-famous Masai Mara Game Reserve. You will have lunch en-route arriving at Lenchada camp/similar in time for lunch. At 16:00 you can enjoy an afternoon game drive in the reserve. Dinner and overnight will be at the camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Masai Mara', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Lenchada Tourist Camp`, activity: `You will have a full day in the reserve with both morning and afternoon game drives at 06:30 and 16:00 respectively. The Mara is the northern extension of the Serengeti and its rolling plains are home to hundreds of plains game together with predators that feed on them. All meals and overnight at the camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Masai Mara - Nairobi', mainDestination: 'Nairobi(City)', nights: '1', hotel: ``, activity: `After early morning breakfast, Proceed to optional Masai Village visit. Later proceed back to Nairobi, We will arrive late in the afternoon. Afterward, we will take you to the airport or to your preferred hotel. End of Masai Mara Safari.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
  "Start your safari with a scenic drive from Nairobi through the Great Rift Valley, arriving in the Masai Mara for your first thrilling afternoon game drive.",
  "Enjoy a full day in Masai Mara with morning and afternoon game drives, spotting the Big Five, predators, and the seasonal Great Migration.",
  "Conclude your adventure with an optional Maasai village visit before returning to Nairobi in the afternoon, filled with unforgettable safari memories."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: '7-day-masai-mara-nakuru-naivasha-amboseli',
    title: `7-Day Masai Mara~Nakuru~Naivasha~Amboseli`,
    location: 'Kenya',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 1430,
    rating: 4.9,
    reviews: 4430,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1430,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This is an epic budget adventure to Kenya’s premier wildlife reserves. The tour takes you through the spectacularly scenic Great Rift Valley to Lake Nakuru, a bird lover’s paradise, then to Naivasha Hells Gate Park. Search for the Big Five, big cats & wildebeest in Masai Mara. From Masai Mara, the tour finally explores Amboseli National Park, lying in the foothills of Mount Kilimanjaro.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The accommodations and destinations of this tour cannot be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
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
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta International Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta International Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi ~ Masai Mara National Park', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Lenchada Tourist Camp`, activity: `Leave Nairobi for Masai Mara Game Reserve with a picnic lunch en route. On arrival, proceed for a game drive in search of black manned lions, elephants, leopards, cheetahs, buffaloes and other plain game. Return to Lenchada Tourist Camp for dinner and your overnight stay.`, image: 'Maasai Mara' },
{ day: 2, location: 'Masai Mara National Reserve Extended Drive', mainDestination: 'Masai Mara National Reserve', nights: '1', hotel: `Lenchada Tourist Camp`, activity: `After breakfast, proceed on a full day of game viewing within the reserve. The landscape here is scenic savannah grassland on rolling hills. The reserve is the best park for game in Kenya as it has an extensive road and track network which allows for close-range viewing and photography. Break for your picnic lunch at the hippo pool, looking out for hippos and crocodiles. Dinner and your overnight stay will be at the campsite`, image: 'Maasai Mara' },
{ day: 3, location: 'Masai Mara National Park -Nakuru', mainDestination: 'Nairobi(City)', nights: '1', hotel: `Hillcourt Resort & Spa`, activity: `After early breakfast there is optional visit masai village and after depart to Nakuru with a picnic lunch on the way. You will be arriving in the evening. Check into your hotel, relax, swim or catch up with your family back home there is Wifi for good comunication. Dinner and your overnight stay will be at Hill court hotel resort.`, image: 'Maasai Mara' },
{ day: 4, location: 'Lake Nakuru National Park~ Lake Naivasha', mainDestination: 'Lake Naivasha (Naivasha)', nights: '1', hotel: `Hotel Chambai Safari`, activity: `After an early breakfast, proceed to the park where you will see a lot of flamingos among other birds. About 350 species
recorded. This is also home to the black and the white rhinoceros. The park has also been established for the protection of endangered species such as the rhino and also home to Columbus monkeys, leopards, giraffes, and a variety of plain antelope. Late in the afternoon, drive to Naivasha arriving in the evening. Dinner and your overnight stay will be at Hotel Chambai Safari.`, image: 'Maasai Mara' },
{ day: 5, location: 'Lake Naivasha~Amboseli National Park', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Manjaro Tented Camp`, activity: `After an early breakfast, proceed to Hells Gate National Park where you will have a chance to visit the Geothermal Power Plant in OlKaria and the Hot Springs. This is the only park that allows transport by walking and cycling. Later, with a picnic
lunch on the way, depart to Amboseli via Nairobi. Arrive and check into Amboseli Manjaro Tented camp. If time allows proceed for evening game drive and return back for dinner and overnight.`, image: 'Maasai Mara' },
{ day: 6, location: 'Amboseli National Park Extensive Game Drive', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Manjaro Tented Camp`, activity: `You'll have a day of game drives in this park which contains swampy grounds in which elephants and hippos bathe in abundance. A variety of plains game, antelopes and birds can also be seen and Mt. Kilimanjaro’s peak too if the weather conditions permit. We will cater for picnic lunches. Later on, return for your overnight stay at Amboseli Manjaro tented camp.`, image: 'Maasai Mara' },
{ day: 7, location: 'Amboseli National Park ~ Nairobi', mainDestination: 'Nairobi Airport (Nairobi)', nights: '1', hotel: ``, activity: `After breakfast, leave the campsite for the last game drive as you leave the park for Nairobi. Picnic lunch served en-route. Arrive in Nairobi late in the afternoon. Drop off will be at the airport or your hotel to end the safari.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
  "Begin your safari with a scenic drive from Nairobi through the Great Rift Valley to Masai Mara, arriving for your first thrilling game drive.",
  "Spend a full day exploring Masai Mara’s rolling savannahs, spotting the Big Five, predators, and seasonal Great Migration herds along the plains and rivers.",
  "Travel to Lake Nakuru, famous for its flamingos, rhinos, giraffes, and diverse birdlife, before relaxing at your hotel in Nakuru town.",
  "Explore Lake Nakuru in the morning, then continue to Lake Naivasha, where you can enjoy the serene lake views and abundant birdlife.",
  "Visit Hell’s Gate National Park for walking or cycling safaris among dramatic cliffs and geothermal springs, then continue to Amboseli with a possible evening game drive.",
  "Enjoy a full day in Amboseli National Park, with breathtaking views of Mount Kilimanjaro and close encounters with large elephant herds and other wildlife.",
  "Conclude your safari with a morning game drive in Amboseli before returning to Nairobi in the afternoon, filled with unforgettable memories of Kenya’s top parks."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '8-day-camping-safari-with-cultural-nature-experiences',
    title: `8-Day Camping Safari with Cultural & Nature Experiences`,
    location: 'Tanzania ',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 1799,
    rating: 5,
    reviews: 3312,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1799,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Experience the best of Tanzania on this 8-day camping safari. Begin with an Arusha city tour and a visit to the scenic Materuni Waterfalls, then enjoy thrilling game drives in Tarangire National Park, the world-famous Serengeti, and the breathtaking Ngorongoro Crater. Add a cultural touch with a Tuk Tuk ride and local cooking class in Mto wa Mbu before concluding your adventure with a smooth departure. A perfect blend of wildlife, culture, and natural beauty all in a classic camping experience.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The accommodations and destinations of this tour cannot be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 5 years",
          description: "The minimum age for this tour is 5 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro International Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arrivals & City tour', mainDestination: 'Arusha (City)', nights: '1', hotel: `Summit Safari Lodge`, activity: `As you walk out of Kilimanjaro International Airport, your personal guide greets you with a big smile: 'Karibu Tanzania - welcome to Tanzania! Once you arrive early, you'll enjoy a complimentary city tour showcasing the town’s highlights, vibrant markets, and local culture, offering you a wonderful introduction to Tanzania. And the guide will drive you to the place of accommodation at Summit Lodge.`, image: 'Maasai Mara' },
{ day: 2, location: 'Materuni Waterfalls', mainDestination: 'Foothills of Mt Kilimanjaro', nights: '1', hotel: `Summit Safari Lodge`, activity: `Materuni Waterfalls is a stunning 70-meter cascade nestled in the lush foothills of Mount Kilimanjaro. A scenic walk-through rainforest and Chagga farms leads you to the falls, perfect for a refreshing swim. The experience includes visiting a local village, learning traditional coffee-making, tasting local food and banana beer, and immersing yourself in Chagga culture. This is a perfect blend of nature, adventure, and culture. Once you are done with the tour the guide will take you back to the place of accommodation at Summit Lodge.`, image: 'Maasai Mara' },
{ day: 3, location: 'Tarangire National Park', mainDestination: 'Tarangire National Park', nights: '1', hotel: `Migombani Campsite`, activity: `Tarangire National Park is famed for its giant baobab trees, sweeping savannahs, and dense wildlife population. The park hosts large herds of elephants, lions, leopards, giraffes, zebras, and many antelope species. The Tarangire River attracts diverse animals, especially during the dry season, creating excellent wildlife viewing. The park also offers superb birdwatching with over 500 species recorded. Its tranquil, less-crowded setting provides a rich and authentic safari experience. After the game drive our guide will drive you to your place of accommodation at Migombani Campsites.`, image: 'Maasai Mara' },
{ day: '4-5', location: 'Serengeti National Park (Central West, East)', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Budget camping`, activity: `Serengeti National Park is widely known as the place to go on safari, mainly because of the Great Migration that passes through here. The enormous, stampeding herds are impressive, as are the vast amount of predators that live here: over four thousand lions, 225 cheetahs, a thousand leopards, 3500 hyenas, and hundreds of wild dogs! And of course, plenty of other beautiful animals, which your guide will be delighted to search for together with you. Are you ready for this? Then then after the game drive the driver guide will drive you back to the place of accommodation at Seronera Campsite.`, image: 'Maasai Mara' },
{ day: 6, location: 'Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `Budget camping`, activity: `The famous Ngorongoro Crater is one of Africa's seven natural wonders. The crater was formed two million years ago when a vast volcano erupted. The fertile lava has created a unique ecosystem, now home to the highest concentration of animals found anywhere in Africa! Once in the crater, thousands of animals such as lions, zebras, buffalos and black rhinos surround you, and the views are astounding – you won’t know where to look!
Your accommodation will be at Ngorongoro Simba Campsites.`, image: 'Maasai Mara' },
{ day: 7, location: 'Tuk Tuk at mto wa mbu & Cooking Class', mainDestination: 'Mto Wa Mbu (Town)', nights: '1', hotel: `Summit Safari Lodge`, activity: `Experience the charm of Mto wa Mbu with a fun Tuk Tuk ride through local farms, markets, and villages, followed by a hands-on cooking class with local women. Discover Tanzanian culture through food, stories, and everyday life — a unique and memorable adventure that supports the local community.`, image: 'Maasai Mara' },
{ day: 8, location: 'Departure', mainDestination: 'Arusha (City)', nights: '', hotel: ``, activity: `The last day! Depending on your flight time, you can relax in the lodge a bit longer before heading to Kilimanjaro International Airport (JRO) for your flight home. Having second thoughts? It's also possible to add a few days to your holiday by going to one of Tanzania's paradise islands, such as Zanzibar, Pemba, or Mafia!`, image: 'Maasai Mara' },
  ],
whatToExpect:[
  "Arrive in Arusha, enjoy a warm welcome, and explore the vibrant city with its colorful markets and cultural highlights.",
  "Hike to the stunning Materuni Waterfalls on the slopes of Mt. Kilimanjaro, swim in the natural pools, and discover Chagga traditions including local coffee-making.",
  "Experience game drives in Tarangire National Park, famous for giant baobab trees, large elephant herds, and diverse wildlife along the Tarangire River.",
  "Spend two unforgettable days in Serengeti National Park, witnessing endless savannahs, the Great Migration (seasonal), and thrilling predator sightings.",
  "Descend into the Ngorongoro Crater, home to Africa’s densest wildlife population, including black rhinos, lions, elephants, and zebras in a dramatic volcanic setting.",
  "Discover Mto wa Mbu on a Tuk Tuk ride through villages and farms, then join a hands-on cooking class with locals for a taste of authentic Tanzanian cuisine.",
  "End your journey in Arusha with time to relax before departure, or extend your adventure to Zanzibar or other idyllic Tanzanian islands."

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '3-Day-Ngorongoro-Kilimanjaro-Hike-Materuni-Waterfalls',
    title: `3-Day Ngorongoro, Kilimanjaro Hike & Materuni Waterfalls`,
    location: 'Tanzania ',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 890,
    rating: 5,
    reviews: 1698,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 890,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This 3-day adventure blends wildlife, nature, and cultural immersion in northern Tanzania. Begin with a thrilling game drive in the Ngorongoro Crater, teeming with wildlife including lions, rhinos, and elephants. On day two, take a guided hike on the slopes of Mount Kilimanjaro, Africa’s tallest peak. Conclude with a visit to Materuni Waterfalls and a local coffee-making experience in a Chagga village. The tour offers a perfect mix of safari, mountain trekking, and cultural experience.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The contents of this tour can be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Not for single travelers",
          description: "Single travelers cannot join this group tour and it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 5 years",
          description: "The minimum age for this tour is 5 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives & nature hikes/walks",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro International Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arusha – Ngorongoro Crater – Arusha', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `Arusha Gateway Lodge II`, activity: `Early morning departure to Ngorongoro Crater. Descend into the crater for a full-day game drive with picnic lunch. Spot the Big Five and enjoy stunning crater landscapes. Visit Maasai Boma and learn about Maasai Lifestyle and culture, Return to Arusha in the evening.`, image: 'Maasai Mara' },
{ day: 2, location: 'Kilimanjaro Hike – Mandara Hut Route', mainDestination: 'Marangu Gate (Mt Kilimanjaro)', nights: '1', hotel: `Materuni Homes`, activity: `Drive to Marangu Gate, begin guided hike through the rainforest to Mandara Hut (~2,700m), spotting monkeys and learning about local flora. Picnic lunch en route. Descend in the afternoon and transfer back to Moshi preparing for the next day cultural tour under slopes of Kilimanjaro.`, image: 'Maasai Mara' },
{ day: 3, location: 'Materuni Waterfalls & Coffee Tour – Departure', mainDestination: 'Materuni Waterfalls (Highlight)', nights: '1', hotel: ``, activity: `Visit Materuni village for a short hike to the impressive 80m-high waterfall. Enjoy a local coffee tour and learn traditional brewing techniques with the Chagga people. Enjoy local Cultural lunch/Buffet before returning to Arusha or transfer to airport.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
  "Start your adventure with a full-day game drive in the world-famous Ngorongoro Crater, spotting the Big Five and exploring Maasai culture before returning to Arusha.",
  "Enjoy a guided hike on Mount Kilimanjaro’s Marangu Route to Mandara Hut, walking through lush rainforest, spotting monkeys, and learning about unique flora.",
  "Visit Materuni village to see the stunning 80m waterfall, swim in natural pools, and take part in a traditional coffee tour with the Chagga people before departure."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '5-Day-Safari-to-Selous-Nyerere-Mikumi-Maasai-Village',
    title: `5-Day Safari to Selous Nyerere, Mikumi & Maasai Village`,
    location: 'Tanzania ',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 1249,
    rating: 4.8,
    reviews: 2182,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1249 ,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `We offer you the best in this 5-day safari in Selous Nyerere and Mikumi safari, probably the only classic safari to the southern circuit of Tanzania. Starting and ending at Dar es Salaam, this safari takes you to the greater Selous ecosystem and gives you the rare chance to experience real African wilderness in the few untouched areas of Tanzania. This safari gives you the opportunity to be in the secluded middle of an African wilderness with the whole savannah almost for your own.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The contents of this tour can be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for single travelers",
          description: "Single travelers can join this group tour, but it requires a minimum of 2 people to run."
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
        activities: "game drives & boat trip",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Dar Es Salaam",
      startAirport: "Julius Nyerere International Airport (DAR)",
      endLocation: "Dar Es Salaam", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Dar es Salaam - Selous Nyerere National Park', mainDestination: 'Nyerere National Park', nights: '1', hotel: `Selous Ngalawa Camp`, activity: `You will be picked up at the hotel 08:00am in the morning after breakfast and drive for 5-6 hours to Selous Nyerere National Park. Upon your arrival you will have hot lunch at the Camp followed by short rest. At 16:00pm enjoy evening Boat safari in the Rufiji River for 2-3 hours. There you will find a variety of birds species and a lot of crocodiles with hippos during your boat safari. In the evening, you will have an overnight stay at Selous Ngalawa Camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Game View Nyerere National Park', mainDestination: 'Nyerere National Park', nights: '1', hotel: `Selous Ngalawa Camp`, activity: `You will have breakfast in your accommodation followed by full-day game drives in the reserve. Selous is home to a large population of elephants, a big number of buffalos and wild dogs. Other species commonly seen are lions, bushbucks, impalas, giraffes, elands, baboons, zebras, kudus and crocodiles. Your overnight stay will be at the Selous Hippo Camp or Selous Ngalawa Camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Nyerere - Mikumi National Park', mainDestination: 'Mikumi National Park', nights: '1', hotel: `Camp Bastian Mikumi`, activity: `In the morning after breakfast, you will check out and proceed by crossing north of Nyerere Park and driving to Mikumi National Park. This safari can take you about 8 hours to Mikumi National Park, crossing through Mount Uluguru. Arrival Mikumi Bastian Camp for dinner and overnbight.`, image: 'Maasai Mara' },
{ day: 4, location: 'Mikumi National Park', mainDestination: 'Mikumi National Park', nights: '1', hotel: `Camp Bastian Mikumi`, activity: `In the morning after breakfast, you will drive to Mikumi National Park for another game drive. Whilst on safari, you can see a rich variety of bird species, as well as large numbers of giraffes, buffalos and elephants. If you are lucky, you may also be able to spot lions, leopards and African wild dogs. Likely to be seen animals include zebras, hippos, hartebeests, wildebeests, impalas, warthogs, elands and antelopes. Several observation towers enable you to have an overview of the park in its entirety. Your overnight stay will be at Camp Bastian on a full-board basis.`, image: 'Maasai Mara' },
{ day: 5, location: 'Mikumi National Park - Maasai Village - Dar es Salaam', mainDestination: 'Mikumi National Park', nights: '1', hotel: ``, activity: `In the early morning at 6:30 am before breakfast, you will walk to a Maasai Village. The boma located at Mikumi village will welcome you then one of the Maasai guides will explain the Maasai way of life, past and present. You will also have a chance to learn about their culture and dance then walk back to the hotel for breakfast before driving back to Dar es Salaam.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
 "Drive from Dar es Salaam to Selous Nyerere National Park, enjoying stunning landscapes on the way.",  
  "Take an evening boat safari on the Rufiji River, spotting crocodiles, hippos, and diverse birdlife.",  
  "Experience a full-day game drive in Selous, home to elephants, lions, giraffes, wild dogs, and more.",  
  "Cross the Uluguru Mountains on your journey to Mikumi National Park for more breathtaking views.",  
  "Enjoy game drives in Mikumi National Park with chances to see zebras, buffaloes, wildebeests, leopards, and numerous bird species.",  
  "Visit a traditional Maasai village, learn about their culture, join in dances, and gain authentic local insights.",  
  "Stay in comfortable safari camps with delicious meals and warm hospitality throughout your journey."  

],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '3-Day-Murchison-Falls-NP-Ziwa-and-Budongo-Safari',
    title: `3-Day Murchison Falls NP, Ziwa, and Budongo Safari`,
    location: 'Tanzania ',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1199,
    rating: 5,
    reviews: 1200,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1199 ,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `As you sink into the deep waters of absolute adventure on your 3 days trip, keep your eyes peeled for exploration. This experience begins the moment you land in the country at Entebbe International Airport, proceeding directly to Ziwa for a rhino tracking safari en route to Murchison Falls National Park. Take on a game drive and boat cruise in Murchison, as you proceed to Budongo Forest. This park is a fiesta bonanza encompassing various experiences, and chimp trekking at Budongo speaks volumes.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The contents of this tour can be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for single travelers",
          description: "Single travelers can join this group tour, but it requires a minimum of 2 people to run."
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
        activities: "game drives, evening/night game drives, chimpanzee trekking & boat trip",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Entebbe",
      startAirport: "Entebbe Airport (EBB)",
      endLocation: "Entebbe", 
      endAirport: "Entebbe Airport (EBB)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Pick up and transfer to Murchison Falls National Park via Ziwa', mainDestination: 'Murchison Falls National Park', nights: '1', hotel: `Parkside Safari Lodge`, activity: `Touch down at Entebbe International Airport, and our guide driver will be on hand to receive you. After a brief overview of what you should expect on this 3 days trip, journey to Murchison Falls National Park via Ziwa Rhino Sanctuary. While at Ziwa, you will be faced with the most endangered Big Five animal, the rhino.
A walk side by side with these incredible mammals on a rhino tracking experience will open your eyes to why they need to be protected, as their epic appearance is a danger to themselves, unfortunately. Vehicles are not allowed in the sanctuary to protect the rhinos’ natural habitat by keeping it as natural as possible. This means that you can track these amazing species on foot, thus adding to your adventure. Head out of the sanctuary for Murchison Falls National Park with a stopover for lunch. As dusk unveils its glamour, you will be checking into your booked lodge in the park for dinner and rest.`, image: 'Maasai Mara' },
{ day: 2, location: 'Game drive and boat cruise', mainDestination: 'Murchison Falls National Park', nights: '1', hotel: `Parkside Safari Lodge`, activity: `Early in the morning, have breakfast and head out for a game drive experience to catch the early risers, such as hippos, as they return to their water holes after a night of grazing. Spot the lions as they return to their thrones after chaos hunts under the cover of darkness. Rise with the birds as they sing you into the savannah as the tall and gentle giraffes accompanied by elephants and buffaloes. Other animals to look out for include leopards, hyenas, elands, reedbucks, and waterbucks. Drive north to the top of Murchison Falls. Witness the strongest force of nature as it crafts an unmatched world marvel right before your eyes.
Later, return you to the lodge for lunch. Journey downstream for a boat cruise experience on the Victoria Nile as you encounter various animals like hippos, crocodiles, and other animals on the shores taking a drink, like elephants, buffaloes, waterbucks, antelopes, etc. Return to the lodge as the sun sets at dusk for dinner and overnight.`, image: 'Maasai Mara' },
{ day: 3, location: 'Chimpanzee trekking in Budongo and departure', mainDestination: 'Budongo Forest (Chimps)', nights: '', hotel: ``, activity: `Rise with the sun for a hefty breakfast before heading south of the park to Budongo Forest in time for a pre-trekking briefing of the chimpanzee permits. Murchison Falls National Park does not seem to stop amazing its visitors, on top of being a savannah park, it is also home to a tropical rainforest.
This Budongo Forest hosts about 600 chimpanzees, therefore, after your briefing and grouping into groups of 8 people, you will track these primates in their natural Budongo habitat. As quietly as possible, you will slowly flow their chants, and the experienced ranger guide will track their movements, and before you know it, you will be in their presence. There and then the clock will start ticking, and in an hour in the chimpanzees’ presence taking pictures as they go by with their chores, will head out of the forest. Your guide driver will be waiting to transport you back to the lodge for lunch, and in the afternoon, check out and depart.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
 "Track rhinos on foot at Ziwa Rhino Sanctuary, learning about conservation efforts for these endangered giants.",  
  "Journey to Murchison Falls National Park with scenic stops and wildlife viewing along the way.",  
  "Take an early morning game drive to spot lions, giraffes, elephants, buffaloes, and diverse birdlife.",  
  "Stand at the top of Murchison Falls and feel the thunderous power of the world’s strongest waterfall.",  
  "Cruise the Victoria Nile, encountering hippos, crocodiles, and elephants along the riverbanks.",  
  "Venture into Budongo Forest for chimpanzee trekking, observing these primates in their natural habitat.",  
  "Enjoy comfortable lodge stays, hearty meals, and expert guidance throughout your safari adventure."  
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '5-Day-Kruger-Adventure-Safari',
    title: `5-Day Kruger Adventure Safari`,
    location: 'South Africa ',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 1112,
    rating: 5,
    reviews: 3893,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1112 ,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `For the budget-strapped traveller, our Ultimate Kruger Budget Safari gives you an excellent opportunity to spot the Big Five and many other animals on an open safari vehicle, at an affordable rate. Enjoy South Africa’s finest wildlife destination at an affordable rate.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
        },
        {
          icon: <Settings className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can be customized",
          description: "The contents of this tour can be changed."
        },
        {
          icon: <UserCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Shared tour",
          description: "On this shared tour, you will join a group of other travelers. Max 7 people per vehicle."
        },
        {
          icon: <Users className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for single travelers",
          description: "Single travelers can join this group tour, but it requires a minimum of 2 people to run."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 6 years",
          description: "The minimum age for this tour is 6 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Johannesburg",
      startAirport: "O.R. Tambo Airport (JNB)",
      endLocation: "Johannesburg", 
      endAirport: "O.R. Tambo Airport (JNB )",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Johannesburg to Kruger National Park', mainDestination: 'Hazyview (Town)', nights: '1', hotel: `Kruger Adventure Lodge`, activity: `Our Ultimate Budget Kruger Safari is designed for those guests who would like to experience a safari to the world-renowned Kruger National Park, whilst travelling on a budget.

Departing from the Johannesburg OR Tambo Airport by 7:00 am, you will travel east through the farmlands and onto the Kruger National Park.

Arriving at the Adventure Lodge located in Hazyview and only 15 minutes drive away from the Phabeni Gate into the national park. There is time to check into your en-suite, air-conditioned accommodation (chalet or tent, depending on availability when booking). Freshen up and depart on your first open vehicle safari drive in the Kruger National Park. This safari drive is for around 2 to 2 ½ hours.

Return to the lodge at sunset in time for a beverage and dinner severed at the lodge.`, image: 'Maasai Mara' },
{ day: 2, location: 'Full day safari in Kruger National Park', mainDestination: 'Kruger National Park', nights: '1', hotel: `Kruger Adventure Lodge`, activity: `Following an early wake-up call, there will be time for tea or coffee and rusks before departing for a full-day open-vehicle safari in the Kruger National Park from approximately 6:00 am to 3:30 pm. Brunch is included along your route, and your guide will also stop for you to purchase refreshments further during the day.

Dinner is served under the stars at the private lodge on the outskirts of the national park.`, image: 'Maasai Mara' },
{ day: 3, location: 'Panorama Scenic Route', mainDestination: 'Panorama Route (Highlight)', nights: '1', hotel: `Kruger Adventure Lodge`, activity: `Breakfast is served at the lodge before departing on a full tour of the Panorama Route, home to the 3rd largest canyon in the world and the largest vegetated canyon in the work. The 8-hour tour takes you to sites such as Gods Window, Bourkes Luck Potholes, the Blyde River Canyon, 3 Rondavels, and 1 of the numerous waterfalls along the route, Graskop and Pilgrims Rest.

Lunch is on your own account at one of the many stops along the route.
After a full day of scenic wonders, you will return to the lodge for a welcoming cold beverage and dinner.`, image: 'Maasai Mara' },
{ day: 4, location: 'Full day Kruger Park Safari', mainDestination: 'Kruger National Park', nights: '1', hotel: `Kruger Adventure Lodge`, activity: `After an early wake-up call, enjoy tea or coffee and rusks before departing for a full-day open vehicle safari in Kruger National Park from approximately 6:00 am to 3:30 pm. Brunch is included along your route, and your guide will also stop for you to purchase refreshments further during the day.`, image: 'Maasai Mara' },
{ day: 5, location: 'Farewell and departure to Johannesburg', mainDestination: 'Johannesburg (City)', nights: '', hotel: ``, activity: `You'll wake up early again and depart on an optional sunrise safari drive in the open safari vehicle.
Note: This safari drive on the final day is an optional extra and can be booked and paid for directly at the lodge on arrival. It's R1050.00 per person, subject to change.

Alternatively, you can enjoy the morning at the lodge before departing Hazyview at noon for your return transfer to Johannesburg, arriving at the Johannesburg OR Tambo Airport between 5:00 pm – 6:00 pm.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
 "Travel from Johannesburg to Hazyview and enjoy your first sunset safari drive in Kruger National Park.",  
  "Spend full days exploring Kruger in open safari vehicles, spotting lions, elephants, giraffes, leopards, and more.",  
  "Tour the breathtaking Panorama Route, including God’s Window, Bourke’s Luck Potholes, and the Blyde River Canyon.",  
  "Savor evenings at a comfortable safari lodge with hearty dinners under the African sky.",  
  "Optionally enjoy a sunrise safari on your final day before returning to Johannesburg."   
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '5-day-kojuu-private-explorer-tour',
    title: `5-Day Kojuu Private Explorer Tour - Premium Luxury`,
    location: 'Tanzania',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 6550,
    rating: 5,
    reviews: 3281,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 6550,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This 5-day premium luxury safari covers Tarangire National Park, Serengeti National Park, and Ngorongoro Crater with all-inclusive accommodation and drinks (excluding premium beverages). Enjoy 1 night at Lemala Mpingo Ridge, 2 nights at Warangi Ridge, and 1 night at Ngorongoro Wilderness Crater Edge. Experience Tanzania’s iconic wildlife and landscapes in comfort and style.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury plus tour",
          description: "This luxury plus tour uses lodges and tented camps."
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
          title: "Suitable for single travelers",
          description: "Solo travelers can book this private tour."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 18 years",
          description: "The minimum age for this tour is 18 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Game Drives in Tarangire National Park', mainDestination: 'Tarangire National Park', nights: '1', hotel: `Elewana Tarangire Treetops`, activity: `You will be picked up from your hotel in Arusha or from Arusha Airport if arriving by morning flight. From there, enjoy a scenic 2-hour drive to Tarangire National Park, located 120 km away in Tanzania’s Northern Circuit. Though the sixth largest park, Tarangire offers incredible wildlife and is known for excellent year-round birdwatching. Explore vast savannahs, ancient baobabs, and spot elephants, lions, leopards, giraffes, and many more. Your expert guide will share insights about the diverse wildlife and smaller creatures. As the afternoon ends, head to your tented lodge for relaxation, dinner, and an authentic overnight safari experience.`, image: 'Maasai Mara' },
{ day: 2, location: 'Game Drives in Serengeti National Park', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Warangi Ridge Lodge`, activity: `After breakfast, your Kojuu Safaris driver-guide and chef will pick you up and drive you to Serengeti National Park via the Ngorongoro Conservation Area, with game viewing along the way. The Serengeti is an immense and wild park, spanning nearly 15,000 sq km. Known as “the endless plains” by the nomadic Maasai, it offers incredible wildlife sightings. Home to the Big Five—lion, leopard, elephant, buffalo, and black rhino—it’s also famous for the annual migration and stunning landscapes. After your game drive, you’ll head to your lodge inside the park for relaxation, dinner, and overnight stay.`, image: 'Maasai Mara' },
{ day: 3, location: 'Game Drives in Serengeti National Park', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Warangi Ridge Lodge`, activity: `Awakened by the sounds of Africa, you’ll freshen up and head to the main area for breakfast. Afterward, your driver-guide will pick you up for a full-day game drive in the Serengeti. If you love wildlife, this is the perfect place. Home to around 3,000 lions—real-life Mufasa, Nala, Simba, and Scar—these majestic cats are often easy to spot as they lounge for up to 20 hours a day. You’ll also see bush elephants, Cape buffaloes, and a variety of birds like the Kori bustard and Fischer’s lovebird. Later, return to your lodge for relaxation, dinner, and overnight stay.`, image: 'Maasai Mara' },
{ day: 4, location: 'Game Drive in Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `Craters Edge Lodge`, activity: `After breakfast, before leaving the Serengeti, you’ll enjoy one last morning game drive in this incredible park. Today, you’ll venture deeper into the world-famous Serengeti, soaking in its vast landscapes and abundant wildlife. After lunch, you’ll begin your journey to Ngorongoro, where you’ll relax at your camp, enjoy dinner, and spend the night. Tomorrow, the awe-inspiring wonder of the Ngorongoro Crater awaits you.`, image: 'Maasai Mara' },
{ day: 5, location: 'Game Drives in Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '', hotel: ``, activity: `Today, you will journey to the Ngorongoro Crater, often called the “8th Wonder of the World,” for a full-day game drive. This well-preserved volcanic caldera, located 190 km from Arusha, is known as “Africa’s Garden of Eden” and serves as a sanctuary for a diverse range of wildlife. The crater’s lush grasslands, forests, and swamps support over 25,000 large mammals. Here, you may spot leopards, lions, black rhinos, hyenas, zebras, waterbucks, baboons, and more. After your game drive, you will ascend from the crater and you will be transfer to Kilimanjaro Airport for your onward flights.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
 "Begin your adventure with a scenic drive from Arusha to Tarangire National Park, known for its baobabs, vast savannahs, and large elephant herds.",  
  "Explore the endless plains of the Serengeti, home to the Big Five, the great migration, and unforgettable wildlife sightings.",  
  "Enjoy thrilling daily game drives with expert guides, spotting lions, leopards, elephants, cheetahs, giraffes, and countless bird species.",  
  "Descend into the Ngorongoro Crater, a UNESCO World Heritage Site often called Africa’s Garden of Eden, teeming with over 25,000 animals.",  
  "Stay in handpicked lodges and tented camps, savoring hearty dinners and the authentic atmosphere of the African wilderness.",  
  "Conclude your safari with lasting memories as you return to Arusha Airport for your onward journey."  
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '5-day-premium-luxury-serengeti-gateway-safari',
    title: `5-Day Premium Luxury Serengeti Gateaway Safari`,
    location: 'Tanzania',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 6896,
    rating: 4.9,
    reviews: 2638,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2638,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This 5-day premium safari is tailored for travelers who want the perfect balance of exclusivity, comfort, and adventure. Seamless flights maximize your time in the Serengeti, while luxury lodges and camps provide world-class service, fine dining, and comfort in the heart of the wilderness. From a sunrise balloon safari to thrilling game drives, every detail is designed to create memories that last a lifetime`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury plus tour",
          description: "This luxury plus tour uses lodges and tented camps."
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
          title: "Suitable for single travelers",
          description: "Solo travelers can book this private tour."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 years",
          description: "The minimum age for this tour is 1 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives & hot air balloon safari",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "Hot air balloon safari",
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arrival in Arusha - A Gateway to the Adventure', mainDestination: 'Arusha (City)', nights: '1', hotel: `Gran Meliá Arusha`, activity: `Upon arrival at Kilimanjaro International Airport, you will be warmly welcomed by an All Wheels Experience representative and transferred in a private vehicle to a luxury lodge in Arusha. This haven of tranquility offers beautifully landscaped gardens, spacious rooms, and elegant dining that blends international flavors with local cuisine. Depending on your arrival time, you may take a leisurely swim, relax with a spa treatment, or enjoy a sundowner on your private balcony overlooking the lush grounds. Your guide will meet you for a briefing about the safari ahead, ensuring you are fully prepared for your adventure. In the evening, enjoy a fine dining dinner and unwind in luxury, knowing the Serengeti awaits you tomorrow.`, image: 'Maasai Mara' },
{ day: 2, location: 'Fly to Central Serengeti – Into the Wild - Overnight in a Luxury Safari Camp', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Nanyukie Lodge`, activity: `After a refreshing breakfast, you will be transferred to Arusha Airport for your scenic flight into the Serengeti. As the aircraft soars above the endless plains, you’ll witness the vast landscapes of Tanzania unfold beneath you. Upon landing at Seronera Airstrip, your private guide will be waiting with a luxury safari vehicle, ready to begin your first game drive. The central Serengeti is renowned for its incredible predator populations, rolling savannah, and year-round wildlife action. Expect to see elephants, giraffes, zebras, and with some luck, the resident leopards lounging in the acacia trees. By late afternoon, you will arrive at your luxury tented camp, set in an exclusive location within the park. Settle into your spacious suite with its private deck, then enjoy a gourmet dinner prepared by skilled chefs before falling asleep to the sounds of the Serengeti at night.`, image: 'Maasai Mara' },
{ day: 3, location: 'Balloon Safari & Full-Day Game Drive – Overnight in a Luxury Safari Camp', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Nanyukie Lodge`, activity: `This day begins with one of the most memorable experiences of your journey: a sunrise hot air balloon safari. As the first light of dawn touches the Serengeti, you will float silently above the golden plains, watching herds of wildebeest, elephants, and giraffes move below you in the crisp morning air. After landing, celebrate with a champagne bush breakfast in the wilderness, an exclusive highlight of your safari. The adventure continues with a full-day game drive tailored to your preferences. With unlimited mileage, your guide will track the day’s wildlife activity, whether following big cats on the hunt or seeking out rare species. A picnic lunch will be served in the wild, surrounded by breathtaking views. As evening approaches, return to your camp where a warm welcome awaits—complete with sundowners by the fire, a candlelit dinner under the stars, and the luxury of your private suite.`, image: 'Maasai Mara' },
{ day: 4, location: 'Full-Day in the Serengeti – Overnight in a Luxury Safari Camp', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Nanyukie Lodge`, activity: `Dedicate another full day to exploring the central Serengeti, one of the most wildlife-rich areas in Africa. Your guide will plan the day according to seasonal wildlife movements, ensuring the best possible sightings. You may encounter prides of lions resting on rocky outcrops, cheetahs scanning the plains for prey, or elephants gathering near water sources. With the freedom of unlimited mileage, you can explore both the open plains and the hidden valleys of this vast park. A picnic lunch in the wilderness allows you to spend the whole day in nature without interruption. In the late afternoon, you may enjoy a leisurely drive back to camp, arriving in time for sundowners with panoramic views of the savannah. Your evening will be filled with fine dining, attentive service, and the tranquil luxury of your tented suite, where you can reflect on the extraordinary encounters of the day.`, image: 'Maasai Mara' },
{ day: 5, location: 'Serengeti - Arusha/Kilimanjaro – Departure', mainDestination: 'Arusha (City)', nights: '', hotel: ``, activity: `On your final morning in the Serengeti, enjoy a relaxed breakfast before setting out on a last game drive, soaking in the beauty of the park and perhaps spotting a few more animals before you leave. The morning light offers excellent photographic opportunities, whether it’s a pride of lions warming themselves in the sun or giraffes striding gracefully across the plains. You’ll then be transferred to the Seronera Airstrip for your air transfer back to Arusha or Kilimanjaro Airport. Upon arrival, an All Wheels Experience representative will assist with your onward arrangements, whether connecting to your international departures or continuing on to other destinations like Zanzibar. Though your safari comes to an end, the memories of breathtaking landscapes, unforgettable wildlife encounters, and luxurious moments in the wild will stay with you for a lifetime.`, image: 'Maasai Mara' },
  ],
whatToExpect:[
  "Arrive in Arusha and unwind in a luxury lodge, with spa treatments, fine dining, and a personalized safari briefing.",
  "Fly into the heart of the Serengeti and begin your adventure with exclusive game drives across the endless plains.",
  "Experience a sunrise hot air balloon safari followed by a champagne bush breakfast in the wilderness.",
  "Enjoy full-day game drives with unlimited mileage, tracking lions, cheetahs, elephants, giraffes, and more with your private guide.",
  "Stay in luxurious tented camps and lodges, savoring gourmet meals, sundowners, and evenings under the African stars.",
  "Conclude your journey with a final Serengeti game drive before flying back to Arusha or Kilimanjaro for onward travel."
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   {
    id: '4-day-safari-high-end',
    title: `4-day-safari-high-end`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 4830,
    rating: 4.9,
    reviews: 3782,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 4830,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `If you only have 4 days but still want to visit the most famous parks of Tanzania (Serengeti, Ngorongoro, and Manyara or Tarangire), this is the perfect tour for you. You only spend one night in Serengeti, which we usually think is too little. But if your time frame is short and you want to visit this amazing park, then it is the right choice for you.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Luxury plus tour",
          description: "This luxury plus tour uses lodges and tented camps."
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
          title: "Suitable for single travelers",
          description: "Solo travelers can book this private tour."
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
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Lake Manyara National Park', mainDestination: 'Lake Manyara National Park', nights: '1', hotel: `Mawe Mawe Lodge`, activity: `You'll be picked up from your hotel at 8:00 am and start a beautiful journey across the Great Rift Valley for a full-day game drive. Although small in dimension (205 sq miles), the park has breathtaking scenery and is well famous for its lush acacia forest, giant figs, and mahogany trees, as well as a growing population of baboons and blue monkeys. Permanent residents of this park also include giraffes, elephants, impalas, and a huge amount of buffaloes. The lake is also home to a large number of hippos. The landscapes of Lake Manyara are something that can not be described with words, and the game drives along the lake provide stunning photo opportunities of giraffes and buffaloes in the foreground and the lake in the background. Some possible extra tours are possible, including a bike tour or a boat excursion. In the afternoon, you'll return to the camp for dinner.

NOTE: You can replace this park with Tarangire National Park or add an extra day and visit both.`, image: 'Maasai Mara' },
{ day: 2, location: 'Serengeti National Park', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Nanyukie Lodge`, activity: `After an early breakfast, you'll depart for the most famous national park in the world, the Serengeti. The driving itself, although long, is spectacular. This will be an unforgettable moment for anyone seeing it for the first time. As you progress well into the Serengeti, you will see why the name means, in the local language, "endless plains". The park has 6,900 sq miles (18,000 sq km) and for most of it, the plains will stretch to the horizon defying your senses and perception of distances. It is the home of the great migration and to 2 million wildebeests, hundreds of thousands of zebras, and all kinds of antelopes. As for the big cats and large predators, it's the place of choice to look out for lions, cheetahs, leopards, and hyenas. There are many television scenes like the famous river crossings that have been filmed in this park.`, image: 'Maasai Mara' },
{ day: 3, location: 'Serengeti National Park to Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `The Highlands Camp`, activity: `On this day, we suggest a very early wake-up call to do an early morning game drive (when the animals are more active) and see one of the best sunrises you'll ever witness. After the game drive, you will return to the camp for a rewarding brunch. Then, you'll proceed to Ngorongoro, the 8th Wonder of the Natural World. The crater spreads for 102 sq. miles and has 2,000 ft high walls, making it virtually Noah's ark and inhabiting almost every species of wildlife that is indigenous to East Africa. It's one of the very rare locations in the whole continent where you can witness the black rhinos. The crater has a river, several swamps, a soda lake with a great concentration of flamingos, a forest, and open plains. It's also famous for its elephants which, are the largest in the world and have huge tusks. Ngorongoro Crater is truly a Wonder of the Natural World.
You will reach Ngorongoro in time for a sundowner.`, image: 'Maasai Mara' },
{ day: 4, location: 'Game Drive in Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '', hotel: ``, activity: `You will start the day very early and descend into the crater floor for an incredible morning of wildlife in one of the most stunning places on Earth. After the game drive, there will be time for a picnic lunch near the beautiful Hippo Lake. After lunch, you will have time for a short game drive. Then, you'll ascend the crater and exit the Ngorongoro Conservation Area towards Arusha. We expect to be back in Arusha at around 5 pm although we are flexible in case there is a flight to catch or another situation.`, image: 'Maasai Mara' },
 ],
whatToExpect:[
  "Start your journey with a scenic drive to Lake Manyara National Park, famous for its diverse landscapes, tree-climbing lions, and large hippo and baboon populations.",
  "Travel onward to the legendary Serengeti, where endless plains host the Great Migration, Big Five sightings, and incredible wildlife encounters throughout the year.",
  "Enjoy thrilling game drives with expert guides, spotting lions, leopards, cheetahs, elephants, giraffes, zebras, and countless bird species across breathtaking savannahs.",
  "Descend into the Ngorongoro Crater, a UNESCO World Heritage Site often called Africa’s Garden of Eden, home to black rhinos, elephants, and over 25,000 animals.",
  "Relax in carefully selected lodges and luxury camps, where you’ll savor gourmet dinners, sundowners, and the authentic atmosphere of the African wilderness.",
  "Conclude your adventure with a final game drive in Ngorongoro before returning to Arusha for your onward journey." 
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
  {
    id: '5-day-tanzania-adventure-serengeti-migration-plus-big-five',
    title: `5-Day Tanzania Adventure -Serengeti Migration + Big Five`,
    location: 'Tanzania',
    duration: '5 Days / 4 Nights',
    pricePerPerson: 3566,
    rating: 5,
    reviews: 2839,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 3566,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Your safari starts and ends in Zanzibar, with a direct flight to the Serengeti. This UNESCO World Heritage Site hosts the incredible Great Migration from July to October, when millions of wildebeests cross the Mara River, bravely facing Nile crocodiles along the way. This unforgettable natural event is combined with visits to Ngorongoro Crater and Tarangire National Park, giving you the chance to experience the migration, see Africa’s Big Five, and enjoy an amazing safari adventure.`,
      tourFeatures: [
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
          title: "Suitable for single travelers",
          description: "Solo travelers can book this private tour."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Zanzibar",
      startAirport: "Abeid Amani Karume Airport (ZNZ)",
      endLocation: "Zanzibar", 
      endAirport: " Dar es Salaam (DAR)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Flight from Zanzibar to Northern Serengeti National Park (Kogatende)', mainDestination: 'Northern Serengeti National Park', nights: '1', hotel: `Baobab Mara Luxury Camp`, activity: `Early at 6:00 am (pickup time depends on your hotel location in Zanzibar), your driver will take you to the airport for your 8:00 am flight to Serengeti. You will arrive at 11:00 am and meet your guide to begin your game drive.

Serengeti National Park is a UNESCO World Heritage Site, famous for the great migration when millions of wildebeests, zebras, and gazelles cross the river into Kenya’s Masai Mara. Watching this dramatic crossing, with Nile crocodiles waiting, is an unforgettable experience. Predators also follow the herds north for hunting.

You will enjoy a packed lunch at a picnic site inside the park. Dinner will be served at the lodge between 7:00 pm and 9:30 pm. Game drives end in the evening around 4:00 pm.`, image: 'Maasai Mara' },
{ day: 2, location: 'Northern Serengeti National Park (Mara River Spot the Migration)', mainDestination: 'Northern Serengeti National Park', nights: '1', hotel: `Tanzania Bush Camps - Central Serengeti`, activity: `Today at 6:30 am, you will set out to explore the wonders of the Northern Serengeti. You'll spend the whole day on game drives, giving you plenty of opportunities to witness the great migration and spot the diverse wildlife that lives in this region. After an exciting day of adventure, you will return to your accommodation for a peaceful night's rest.

Meals for the day:

Breakfast will be served at the camp starting from 6:00 am.

Lunch will be a picnic enjoyed at a scenic spot inside the park in the afternoon.

Dinner will be served back at the camp in the evening.

Your game drive will end in the evening.`, image: 'Maasai Mara' },
{ day: 3, location: 'Central Serengeti National Park Game Drive (Big Five Animals)', mainDestination: 'Central Serengeti National Park', nights: '1', hotel: `Moyo Tented Camp`, activity: `You'll wake up to the beautiful sounds of birds singing and chirping. After breakfast at the camp, you will head to Central Serengeti for a full-day game drive, giving you the chance to see Africa’s famous Big Five. In the late afternoon, you’ll return to the lodge for dinner and a restful overnight stay.

The Serengeti is famous for its rich wildlife, especially the Big Five. It has one of Africa’s largest lion populations, with over 3,000 lions roaming its plains. African leopards, though elusive, are often seen in the Seronera area, and you may spot some of the 1,000 African elephants that live here too.`, image: 'Maasai Mara' },
{ day: 4, location: 'Ngorongoro Crater (Rhino + Flamingos)', mainDestination: 'Ngorongoro Crater', nights: '', hotel: ``, activity: `You’ll rise early for breakfast before setting off on a game drive transfer to Ngorongoro Crater. The drive takes about two hours, with stops along the way to spot wildlife.

Ngorongoro’s main highlight is its vast volcanic crater—the world’s largest intact caldera—measuring 20 kilometers across, 600 meters deep, and covering 300 square kilometers. Inside, you’ll explore Lake Magadi, a shallow alkaline lake known for black rhinos, flamingos, hippos, and various water birds.

You'll enjoy a full-day game drive within the crater. In the evening, you'll return to your accommodation for dinner and a restful night. An early start allows time to enjoy lodge amenities like the swimming pool.`, image: 'Maasai Mara' },
{ day: 5, location: 'Game Drive in Tarangire National Park then Fly Back to Zanzibar', mainDestination: 'Tarangire National Park', nights: '', hotel: ``, activity: `After breakfast at 7:00 am, you’ll drive to Tarangire National Park for an exciting game drive. In the afternoon, you’ll head back to Arusha Airstrip to catch your 4:30 pm flight back to Zanzibar.

Tarangire National Park is famous for its rich biodiversity, including large herds of elephants. The park features a variety of landscapes, from seasonal swamps to savannahs, with the Tarangire River winding through the area. You might witness a lion stalking its prey or spot leopards resting high in the trees.`, image: 'Maasai Mara' },

 ],
whatToExpect:[
  "Fly from Zanzibar into the Serengeti for an unforgettable safari adventure starting in the Northern region, home to the dramatic Mara River crossings during the Great Migration.", 
  "Spend full days on thrilling game drives in the Northern Serengeti, where wildebeests, zebras, and gazelles attract predators like lions, leopards, and crocodiles.", 
  "Explore the Central Serengeti, famous for its abundant Big Five populations, vast savannah landscapes, and exceptional wildlife photography opportunities.", 
  "Descend into the world’s largest intact volcanic caldera, the Ngorongoro Crater, to see black rhinos, flamingos, hippos, elephants, and an incredible density of wildlife.", 
  "Conclude your journey with a game drive through Tarangire National Park, renowned for its giant elephant herds, ancient baobab trees, and diverse wildlife before flying back to Zanzibar." 
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '4-day-luxury-tanzania-safari-tarangire-serengeti-ngorongoro',
    title: `4-Day Luxury Tanzania Safari`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 2549,
    rating: 5,
    reviews: 1489,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2549,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `You'll embark on a lavish 4-day safari adventure, immersing yourself in the wonders of the Northern Safari Circuit. The lodgings you'll enjoy rank among Tanzania's finest, promising a truly luxurious experience. You'll encounter awe-inspiring wildlife amidst a backdrop of diverse landscapes—observe playful monkeys in the lush forest, spot lions perched in trees, witness majestic elephants traversing the bush and marvel at a myriad of animals thriving within the confines of a collapsed volcano.`,
      tourFeatures: [
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
          title: "Suitable for single travelers",
          description: "Solo travelers can book this private tour."
        },
        {
          icon: <CalendarCheck className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Can start any day",
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: " Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: " DArusha Airport (ARK ",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arusha to Tarangire National Park', mainDestination: 'Tarangire National Park', nights: '1', hotel: `Ngorongoro Marera Mountain View Lodge`, activity: `Our driver buddy will swing by your hotel, and off you'll go to Tarangire for a fun game drive with a packed lunch. This place is a hotspot for lots of elephants, cool cat families, various birds, and those funky baobab trees. Plus, it's like a haven for animals because of the Tarangire River.

After the day's adventures, dinner, and a cozy sleep await you at Ngorongoro Marera Mountain View. Sweet dreams under the stars!`, image: 'Maasai Mara' },
{ day: 2, location: 'Karatu to Serengeti National Park', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Into Wild Africa Luxury Safari Camp Serengeti`, activity: `After breakfast, you'll drive towards Serengeti National Park, passing through the pretty farmlands of Karatu and the Ngorongoro Conservation Area. Leaving the highlands, you'll enter the heart of wild Africa —Serengeti National Park, with its vast plains stretching endlessly.

Your destination is the central Seronera area, a super-rich wildlife spot in the park. It's got the Seronera River, a key watering hole that attracts lots of Serengeti species. You'll get there in time for lunch and then dive into an afternoon game drive. Dinner and a night's rest await you at Into Wild Camp. Get ready for some wild dreams!`, image: 'Maasai Mara' },
{ day: 3, location: 'Serengeti to Ngorongoro Crater', mainDestination: 'Serengeti National Park', nights: '1', hotel: `Ngorongoro Marera Mountain View Lodge`, activity: `You will grab your breakfast at about 6:00 am, and then it's time for a morning game drive in the Serengeti with a packed lunch. Get ready for a wildlife feast— lions, wildebeests, leopards, impalas, elephants, crocs, zebras, and more!

As the afternoon rolls in, you will hit the road to Ngorongoro, enjoying a cool game drive along the way for about 3 hours. When you reach, you will check into Marera Mountain View. Dinner and your night's rest are all set up.`, image: 'Maasai Mara' },
{ day: 4, location: 'Ngorongoro Crater to Arusha', mainDestination: 'Ngorongoro Crater', nights: '', hotel: ``, activity: `You will enjoy a filling breakfast at the lodge, and then gear up for an exciting game drive with your packed lunch. Early in the morning, you will take a descent to the crater floor for a 5 to 6-hour game drive. You will get ready for the fantastic sight of a pride of lions, massive elephants, herds of wildebeests and zebras, rhinos, and more.

As the afternoon rolls in, you will bid farewell to the park and embark on the journey back to Arusha. It's been a wild adventure, and now it's time to head home.`, image: 'Maasai Mara' },

 ],
whatToExpect:[
  "Begin your adventure with a scenic drive from Arusha to Tarangire National Park, famous for its giant elephant herds, ancient baobab trees, and rich wildlife along the Tarangire River.",  
  "Journey through the Ngorongoro highlands into the legendary Serengeti, where endless plains, the Seronera River, and diverse wildlife await with unforgettable game drives.",  
  "Enjoy thrilling morning and afternoon game drives in the Serengeti, spotting lions, leopards, elephants, wildebeests, zebras, and more before heading towards Ngorongoro.",  
  "Descend into the Ngorongoro Crater, a UNESCO World Heritage Site often called Africa’s Eden, home to black rhinos, lions, flamingos, and over 25,000 animals in one place.",  
  "Conclude your safari with a return to Arusha, carrying memories of Africa’s breathtaking landscapes, incredible wildlife encounters, and magical nights under the stars."  
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '4-day-luxury-samburu-olpejata',
    title: `4-Day Luxury Samburu NR and Ol Pejeta Conservancy`,
    location: 'Kenya',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 2580,
    rating: 4.7,
    reviews: 2934,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2934,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This is the most unique and the least crowded game reserve situated on the Kenyan Northern Frontier. You will have a chance to explore Ol Pejeta Game Sanctuary, which is situated in the Laikipia area and h/s home to the Big Five. You'll experience the true magic of Kenya at the Samburu Game Reserve, which is a rugged and semi-desert park with a backdrop of jagged mountains and a host to the endangered Grevy’s zebra, the rare beisa oryx, and the blue-shanked Somali ostrich.`,
      tourFeatures: [
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi/Ol Pejeta Game Sanctuary', mainDestination: 'Ol Pejeta Conservancy (Laikipia Plateau)', nights: '1', hotel: `Sweetwaters Serena Camp`, activity: `Pick up this morning will either be from the airport or your Nairobi accommodation. You'll then depart for your safari, driving through the main farming areas of Kenya with pineapple, coffee, and fruit trees, and fresh produce. You will have a stopover at the open-air Karatina market, which is the biggest farm produce market in the region. You will arrive in time for lunch at Sweet Waters Serena Camp. Later, you will proceed on a game drive where you will have a chance of seeing both white and black rhino, elephant, spotted hyena, lion, cheetah, black-backed jackal, the bat-eared fox, the elusive leopard, hippo, Grevy’s zebra, Jackson’s hartebeest, among other wild. You will also visit the Chimp Sanctuary, which provides refuge to orphaned and abused chimpanzees. You'll return to the Sweet Waters Serena Camp to wait for dinner. An optional night game drive is offered here, together with other camp clients using the camp vehicle. Your overnight stay is at Sweet Waters Serena Camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Ol Pejeta Game Sanctuary/Samburu Buffalo Springs Game Reserve', mainDestination: 'Buffalo Springs National Reserve', nights: '1', hotel: `Ashnil Samburu Camp`, activity: `You'll have an early morning game drive at Ol Pejeta Game Sanctuary, followed by breakfast, then depart for Isiolo and continue with your safari to Samburu Buffalo Springs Game Reserve. It offers dramatic scenery and is fed by the Ewaso Nyiro River. Lunch will be served at Ashnil Samburu Camp. You will then have an evening game drive or choose to rest and enjoy the hotel amenities.
Dinner and your overnight stay are at Ashnil Samburu Camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Samburu Buffalo Springs Game Reserve', mainDestination: 'Buffalo Springs National Reserve', nights: '1', hotel: `Ashnil Samburu Camp`, activity: `After the morning breakfast, you will spend the whole day exploring Buffalo Springs Game Reserve with chances of seeing the rare long-necked gerenuk, elephants, buffaloes, the rare Grevy's, elands, lion, cheetah, leopard, not forgetting different species of birds. You shall then break for lunch and late on continue late in the evening.
Optional visit to the Samburu cultural village. Dinner and your overnight stay are at Ashnil Samburu.`, image: 'Maasai Mara' },
{ day: 4, location: 'Samburu Buffalo Springs Game Reserve to Nairobi', mainDestination: 'Nairobi (City)', nights: '1', hotel: ``, activity: `You'll enjoy an early morning game drive followed by breakfast. Later, you'll depart from Samburu with an optional visit to the Samburu cultural village en route. You'll proceed to Nanyuki, where you will have a stopover at the equator for a photo and demonstration of how water spins North and South of the Equator. You will arrive in Nairobi in time to be dropped off either at your Nairobi accommodation or the airport for your onward journey connections.`, image: 'Maasai Mara' },
 ],
whatToExpect:[
    "Start your journey from Nairobi with a scenic drive through Kenya’s fertile highlands, stopping at the bustling Karatina market before arriving at Ol Pejeta Conservancy.",  
  "Explore Ol Pejeta, home to black and white rhinos, lions, elephants, and the famous Chimpanzee Sanctuary, with options for exciting night game drives.",  
  "Continue to Samburu Buffalo Springs, where dramatic landscapes and the Ewaso Nyiro River attract unique wildlife including Grevy’s zebra, gerenuk, and elephants.",  
  "Spend a full day in Samburu on thrilling game drives, with opportunities to spot lions, leopards, cheetahs, and diverse birdlife, plus an optional cultural visit to the Samburu village.",  
  "Conclude your adventure with a return to Nairobi, including a stop at the Equator in Nanyuki for a photo opportunity and unique demonstration."  
],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '3-Day Tarangire Manyara & Ngorongoro Crater',
    title: `3-Day Tarangire Manyara & Ngorongoro Crater`,
    location: 'Tanzania',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1800,
    rating: 5,
    reviews: 2358,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 2358,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Go on a 3-day, 2-night safari in Tanzania and explore the stunning Tarangire, Ngorongoro Crater, and Lake Manyara. Enjoy a private tour with an expert guide in a comfortable safari Jeep that has sockets and a fridge. Throughout your trip, unlimited water will be provided, making sure you stay refreshed and enjoy the beauty of Tanzania’s natural wonders.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 5 years",
          description: "The minimum age for this tour is 5 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arusha/JRO Airport – Tarangire', mainDestination: 'Tarangire National Park', nights: '1', hotel: `Hhando Coffee Lodge`, activity: `Upon arrival at Arusha/JRO Airport, our tour guide will greet you and have your lunch box ready. We will then drive to Tarangire National Park, where we’ll check in at the park gate and start the game drive. Keep an eye out for herds of elephants and the iconic baobab trees. After the game drive, we’ll take you to your lodge for dinner and an overnight stay.

Tarangire is known for its large elephant herds and stunning baobab trees. While exploring, you'll have the chance to see a variety of wildlife, such as zebras, impalas, lions, cheetahs, and leopards, all in their natural environment.`, image: 'Maasai Mara' },
{ day: 2, location: 'Karatu – Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `Marera Valley Lodge`, activity: `After breakfast, we’ll begin our scenic journey to Ngorongoro Crater for a game drive. We’ll descend into the crater to see the Big Five and other fascinating wildlife. After the game drive, we’ll return to Karatu for your overnight stay.

Ngorongoro Crater, often referred to as "Africa's Garden of Eden", is a remarkable natural wonder located in northern Tanzania. The huge crater was formed over 2.5 million years ago when a large volcano, about the size of Mount Kilimanjaro, erupted and collapsed.`, image: 'Maasai Mara' },
{ day: 3, location: 'Lake Manyara – Arusha/JRO Airport', mainDestination: 'Lake Manyara National Park', nights: '', hotel: ``, activity: `After breakfast, we’ll drive to Lake Manyara National Park for a game drive. Keep an eye out for the famous tree-climbing lions, large herds of elephants, and vibrant birdlife around the lake. After the game drive, we’ll head to Arusha/JRO Airport, marking the end of your safari.

Lake Manyara is a shallow, alkaline lake in northern Tanzania, known for its beautiful scenery and wide variety of wildlife. It’s part of Lake Manyara National Park, which includes lush forests, open grasslands, and hot springs. The lake is famous for its large flamingo flocks and tree-climbing lions, and its size changes depending on seasonal rainfall.`, image: 'Maasai Mara' },

 ],
whatToExpect:[
  "Begin your adventure in Tarangire National Park, famous for its massive elephant herds, ancient baobab trees, and rich variety of wildlife including lions, leopards, zebras, and giraffes.",  
  "Descend into the Ngorongoro Crater, Africa’s Garden of Eden, to witness the Big Five, flamingos, hippos, and one of the world’s densest concentrations of wildlife.",  
  "Conclude your safari at Lake Manyara National Park, where tree-climbing lions, large elephant families, vibrant birdlife, and stunning landscapes create a perfect ending to your journey.",  
  "Enjoy comfortable lodge stays with hearty meals after each day of thrilling game drives, combining relaxation with authentic safari experiences.",  
  "End your trip back in Arusha/JRO with unforgettable memories of Tanzania’s diverse parks and iconic wildlife encounters."   
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '4-day-lodging-tarangire-ngorngoro-materuni',
    title: `4-Day Lodging to Tarangire, Ngorongoro & Materuni`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1999,
    rating: 4.7,
    reviews: 1893,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1999,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Get ready for the adventure of a lifetime! Witness the mighty elephants of Tarangire roaming beneath ancient baobabs, descend into the breathtaking Ngorongoro Crater—an Eden of wildlife and a UNESCO World Heritage site—and cap off your journey with a refreshing hike to the spectacular Materuni Waterfalls. This unforgettable safari blends raw nature, rich wildlife, and scenic beauty into an experience you’ll treasure forever.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 years",
          description: "The minimum age for this tour is 1 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives and nature hikes/walks",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Arusha", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Airport Pickup & Arusha City Tour', mainDestination: 'Arusha (City)', nights: '1', hotel: `Tulia Boutique Hotel & Spa`, activity: `You'll start your adventure with a warm airport pickup, where our friendly guide will greet you and take you to your hotel to settle in and refresh. Once you’re ready, immerse yourself in the vibrant energy of Arusha with a guided city tour. You'll wander through the bustling local markets, alive with color, sounds, and the rich aroma of Tanzanian street food. You'll stop by the Maasai Cultural Museum, where you’ll gain insight into the history and traditions of one of Tanzania’s most iconic people. As you stroll through the lively streets, take in local art, handmade crafts, and the vibrant culture that defines Arusha. Don't miss the chance to sample mouthwatering traditional Tanzanian dishes, offering a taste of the region’s unique flavors. You'll browse local shops for souvenirs that reflect the spirit of this fascinating country. After a day of exploration, you'll enjoy dinner at a local restaurant, perfect for unwinding and gearing up for the exciting adventure ahead.`, image: 'Maasai Mara' },
{ day: 2, location: 'Tarangire National Park', mainDestination: 'Tarangire National Park', nights: '1', hotel: `Bougainvillea Safari Lodge`, activity: `We’ll pick you up from your hotel at 7:30 am for an unforgettable day! After meeting your guide, you’ll be driven 2 hours to Tarangire National Park, famous for its stunning landscapes, ancient baobab trees, and the largest elephant population in Tanzania. Get ready for an exciting game drive to track predators like lions, cheetahs, and leopards, while also spotting giraffes, wildebeests, and zebras.

At midday, you’ll stop at the Tarangire River picnic site for a delicious lunch, offering breathtaking views of the river and wildlife. Watch out for cheeky monkeys and baboons, who might try to steal your lunch—but they’re harmless! After lunch, you’ll continue the game drive and explore more of the park’s beauty. You’ll exit the park around 5:30 pm and head to your accommodation to unwind after a day of adventure.`, image: 'Maasai Mara' },
{ day: 3, location: 'Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `Tulia Boutique Hotel & Spa`, activity: `The Ngorongoro Crater is one of Tanzania’s top wildlife destinations, offering stunning landscapes and incredible wildlife sightings. After an early breakfast at 6:00 am, you’ll head to the Ngorongoro viewpoint, where the breathtaking views will leave you speechless. You’ll then descend into the crater, on the lookout for the elusive black rhinos. Though harder to spot, rhinos aren’t the only highlight—due to the crater’s unique landscape, many animals are easily visible, making for a truly magical experience.

The Ngorongoro Crater is a self-sustaining haven for wildlife, so animals don’t need to migrate. Its stunning scenery and abundance of animals make it a must-see destination. After a delicious lunch, you’ll continue your game drive, exploring more of the crater before ascending back to the rim and transferring to your accommodation in Arusha. It’s a day filled with unforgettable wildlife moments and natural beauty!`, image: 'Maasai Mara' },
{ day: 4, location: 'Materuni Waterfalls & Airport Drop-Off', mainDestination: 'Materuni Waterfalls (Highlight)', nights: '', hotel: ``, activity: `We’ll take you on a scenic hike to the breathtaking Materuni Waterfalls, nestled in the lush foothills of Mount Kilimanjaro. As you trek through vibrant forests, you'll be immersed in nature’s beauty, with the sound of flowing water guiding you to the towering waterfall. Along the way, you'll enjoy a fascinating coffee tour where you'll learn about local coffee production, from bean to cup. Afterward, you'll savor a delicious lunch of traditional local cuisine, offering a true taste of the region. Relax, snap photos, and soak in the tranquil atmosphere before you head back.

Afterward, we’ll transfer you to the airport for your drop-off, ensuring you have plenty of time for your departure. Reflect on the incredible experiences and wildlife you’ve encountered as you head home— a perfect end to an unforgettable adventure in Tanzania!`, image: 'Maasai Mara' },
 ],
whatToExpect:[
 "Begin your journey in Arusha with a guided city tour, exploring vibrant markets, local art, and the Maasai Cultural Museum before relaxing at your boutique hotel.",  
  "Discover Tarangire National Park, home to Tanzania’s largest elephant herds, majestic baobab trees, and diverse wildlife including lions, leopards, giraffes, zebras, and wildebeests.",  
  "Descend into the Ngorongoro Crater, a UNESCO World Heritage Site, to witness the Big Five, flamingos, hippos, and one of Africa’s most concentrated wildlife habitats.",  
  "Hike to the stunning Materuni Waterfalls at the base of Mount Kilimanjaro and enjoy a traditional coffee tour for an authentic cultural experience.",  
  "Conclude your adventure with an airport transfer, carrying unforgettable memories of Tanzania’s wildlife, landscapes, and vibrant culture."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '4-day-astonish-mikumi-ruaha-national-park',
    title: `4-Day Astonish Mikumi NP and Ruaha National Park`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1449,
    rating: 4.8,
    reviews: 1174,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1174,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Tanzania's southern circuit's national parks and game reserves are often considered hidden treasures of authentic African wilderness. These expansive parks boast some of the highest concentrations of wildlife found anywhere on the continent and feature a remarkable diversity of animals. Among them are roan antelopes, lions, sable antelopes, large herds of elephants, African wild dogs (also known as Cape hunting dogs) and a wide variety of colorful bird species.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 6 years",
          description: "The minimum age for this tour is 6 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Dar Es Salaam",
      startAirport: "Julius Nyerere Airport (DAR)",
      endLocation: "Dar Es Salaam", 
      endAirport: "Julius Nyerere Airport (DAR)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Dar es Salaam to Mikumi National Park', mainDestination: 'Mikumi National Park', nights: '1', hotel: `Camp Lilac`, activity: `We will pick you up from your hotel or the ferry and drive you to the SGR station for your train to the Morogoro region, which will take approximately 1.5 hours. Upon arrival, our driver-guide will take you to Mikumi National Park for a late-morning game drive until lunch. After lunch, you will have time to relax before continuing with an afternoon to evening game drive. Dinner and an overnight stay will be at Camp lilac Mikumi.`, image: 'Maasai Mara' },
{ day: 2, location: 'Mikumi National Park to Ruaha National Park', mainDestination: 'Ruaha National Park', nights: '1', hotel: `TANAPA Ruaha Bandas`, activity: `You will be picked up from the hotel at 6:30am. After breakfast, you will drive to Ruaha National Park, which will take approximately five hours. Lunch will be provided upon your arrival. You will begin your game drive in the afternoon, which will continue into the evening. The Great Ruaha River, the park's namesake, is essential for supporting its diverse wildlife. Although Ruaha is one of the largest national parks in Tanzania and boasts a rich variety of animals, it is also one of the least crowded destinations, making your safari experience feel remote and exclusive.

Your dinner and overnight stay will be at Tanapa Ruaha Bandas.`, image: 'Maasai Mara' },
{ day: 3, location: 'Game Drive in Ruaha National Park', mainDestination: 'Ruaha National Park', nights: '1', hotel: `Ruaha Hilltop Lodge`, activity: `On this day, you will leave early at 6:30am for a sunrise game drive, enjoying breakfast in the bush. After the breakfast break, the game drive will continue as you search for wildlife in various locations throughout the park. Be on the lookout for predators such as lions, cheetahs, and large packs of wild dogs, along with numerous other animals, until the lunch break.

You will have a picnic lunch in the park where you can take some time to rest. After lunch, the game drive will resume until the evening. As you drive along the Great Ruaha River, you can expect to see a variety of animals, including buffalo, giraffes, wildebeest, zebras, impalas, warthogs, elephants, hippos, crocodiles, greater and lesser kudu, sable and roan antelopes, as well as different species of birds, plants and reptiles.

After a full day of exploration, you will return to your lodge for dinner and an overnight stay.`, image: 'Maasai Mara' },
{ day: 4, location: 'Ruaha Hilltop Lodge to Dar es Salaam', mainDestination: 'Dar Es Salaam (City)', nights: '1', hotel: ``, activity: `After breakfast, you will pack your luggage, and we will begin our 6.5-hour drive to Morogoro town for the train. The train departs at either 4:00pm or 7:00pm for Dar es Salaam.

Upon your arrival in Dar es Salaam, we will pick you up and take you to your hotel or the airport for your flight to Zanzibar or back home.`, image: 'Maasai Mara' },
 ],
whatToExpect:[
  "Start your adventure with a scenic SGR train ride from Dar es Salaam to Morogoro, followed by thrilling game drives in Mikumi National Park, spotting elephants, lions, giraffes, and zebras.",  
  "Explore Ruaha National Park, Tanzania’s largest and most remote wilderness, with its vast landscapes, the Great Ruaha River, and fewer crowds for an exclusive safari experience.",  
  "Witness diverse wildlife including lions, cheetahs, wild dogs, elephants, hippos, crocodiles, buffalo, and unique antelope species such as sable, roan, and kudu.",  
  "Enjoy sunrise and full-day game drives with bush breakfasts, picnic lunches, and incredible views of rivers, savannahs, and rolling hills.",  
  "Conclude your journey with a scenic drive back to Dar es Salaam, where you’ll be transferred to your hotel, airport, or onward flight to Zanzibar."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '4-day-amboseli-tsavo-east-west',
    title: `4-Day Amboseli, Tsavo East and West Safari`,
    location: 'Kenya',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1890,
    rating: 5,
    reviews: 2383,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1890,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `This four-day trip is pure wildlife viewing. It takes us to the incredible Amboseli National Park, home of the largest herds of elephants you will ever see! The tour also includes a night in the expansive Tsavo National Parks and a visit to Mzima Springs, giving you the chance to explore the very best of Kenya.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Mid-range tour",
          description: "This mid-range tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 years",
          description: "The minimum age for this tour is 1 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi to Amboseli National Park', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Penety Amboseli Resort`, activity: `We will pick you up from either your hotel or the airport. After your safari briefing, we will proceed to Amboseli National Park. Upon arrival at the camp, we will check in and have lunch. In the afternoon, we will depart for a game drive.

Amboseli National Park is situated towards the southeast of Nairobi. Most of the park consists of a dry, ancient lake bed and fragile grassland with patches of acacia woodland, while in the southern area, you will find several small, rocky, volcanic hills. Around the swamps (Ol Okenya, Ol Tukai, and Enkongo Narok), the vegetation is lush with yellow-barked acacias and phoenix palms.

Your dinner and overnight stay are at the camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Amboseli National Park to Tsavo West National Park', mainDestination: 'Tsavo West National Park', nights: '1', hotel: `Ngulia Safari Lodge`, activity: `You depart after breakfast for Tsavo West National Park with a game drive. A stop at the famous Mzima Springs is guaranteed. Later, you will head to your lodge and check in for lunch. Relax at your lodge until 16h00, when the driver picks you up and leads you to the afternoon game drive for two hours. Spot the maneless lions in the park. This afternoon, you will also visit the rhinoceros sanctuary.

Return for dinner and your overnight stay.`, image: 'Maasai Mara' },
{ day: 3, location: 'Tsavo East National Park', mainDestination: 'Tsavo East National Park', nights: '1', hotel: `Voi Safari Lodge`, activity: `After breakfast, you will check out and proceed to Tsavo East National Park with a game drive. You will arrive at your lodge early afternoon for a hot lunch. After relaxation, you will have time to enjoy the serenity at your lodge as you experience the activities offered by the facility.

Later, around 15h00, your tour guide will pick you up and you will embark on another game drive to the Aruba Dam. This park is famous for the man-eaters of Tsavo. Enjoy game drives until late evening before returning to your lodge for dinner and your overnight stay.`, image: 'Maasai Mara' },
{ day: 4, location: 'Tsavo East National Park to Nairobi', mainDestination: 'Nairobi Airport (Nairobi)', nights: '1', hotel: ``, activity: `After breakfast at the camp, you have an optional morning game drive in the reserve before our departure to Nairobi.

Upon arrival in Nairobi, we can arrange lunch at a restaurant before you are dropped off at your hotel or airport for your departure back home.`, image: 'Maasai Mara' },

 ],
whatToExpect:[
   "Begin your journey in Nairobi and head to Amboseli National Park, famous for its massive elephant herds and breathtaking views of Mount Kilimanjaro.",  
  "Explore Tsavo West National Park, visiting the crystal-clear Mzima Springs and spotting diverse wildlife including rhinos, elephants, and the legendary maneless lions.",  
  "Continue to Tsavo East National Park, renowned for its vast landscapes, the Aruba Dam, and the historic tales of the Tsavo man-eaters.",  
  "Experience thrilling morning and afternoon game drives across iconic Kenyan savannahs, offering incredible opportunities for photography and wildlife encounters.",  
  "Conclude your safari with a scenic drive back to Nairobi, with the option of a final lunch stop before being dropped off at your hotel or airport."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '3-day-amboseli-tsavo-east-mombasa',
    title: `3-Day Amboseli -Tsavo East -Mombasa Safari`,
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1149,
    rating: 4.8,
    reviews: 3529,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1149,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `The tour offers a chance to explore Kenya's second most famous park after Masai Mara. Amboseli is famous for the large herds of elephants, in addition, it offers the best view of the Africans top highest mountain Mt Kilimanjaro. You will also have a chance to visit either Tsavo West or Tsavo East depending on where you want to be dropped after the safari. The tour can either start in Nairobi or Mombasa.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for all ages",
          description: "This tour is suitable for children of all ages."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Mombasa", 
      endAirport: "Moi Airport (MBA)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi - Amboseli National Park', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Nyati Safari Camp`, activity: `You'll be picked up from the airport or hotel in Nairobi and drive to Amboseli National Park. The park is famous for its herds of elephants, the Big Five, and the famous Africa highest mountain, Mount Kilimanjaro. You will arrive time for lunch, have lunch then proceed to afternoon game drive. Dinner and your overnight stay will be at the camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Amboseli National Park - Tsavo East National Park', mainDestination: 'Tsavo East National Park', nights: '1', hotel: `Red Elephant Safari Lodge`, activity: `Breakfast and depart from Amboseli National Park in the morning and drive to Tsavo East with a game drive en-route. On arrival at the lodge check in and have lunch. Then proceed to an afternoon game drive in search of wildlife. Later, drive back to the lodge for dinner and your overnight stay at the lodge.`, image: 'Maasai Mara' },
{ day: 3, location: 'Tsavo East National Park -Mombasa or Diani', mainDestination: '', nights: '1', hotel: ``, activity: `You'll have breakfast. Then check out and drive to Mombasa through the park with enroute game drive arriving at around noon. You'll be dropped off at your beach hotel.`, image: 'Maasai Mara' },
 ],
whatToExpect:[
  "Start your adventure in Nairobi and journey to Amboseli National Park, famous for its herds of elephants and breathtaking views of Mount Kilimanjaro.",  
  "Enjoy thrilling game drives in Amboseli, spotting the Big Five, giraffes, zebras, and diverse birdlife against the stunning backdrop of Africa’s highest peak.",  
  "Continue to Tsavo East National Park, one of Kenya’s largest parks, renowned for its red-dusted elephants, wide landscapes, and unforgettable game drives.",  
  "Experience afternoon and morning game drives in Tsavo East, with chances to spot lions, buffalo, cheetahs, and other wildlife in their natural habitat.",  
  "Conclude your safari with a scenic drive to Mombasa or Diani, where you’ll be dropped off at your beach hotel to relax by the Indian Ocean."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '3-day-samburu-wildernes-adventure',
    title: `3-Day Samburu Wildernes Adventure`,
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1220,
    rating: 4.9,
    reviews: 2379,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1220,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `A safari in Samburu National Reserve promises breathtaking encounters with a variety of wild animals. You may spot elusive predators such as leopards, lions, and cheetahs, as well as abundant plains game species. The reserve is renowned for its unique Special Five —distinctive animals rarely found elsewhere. These include the Beisa oryx, known for its elegant horns; the long-necked gerenuk, the Grevy's zebra, the reticulated giraffe, and the Somali ostrich.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget Camping",
          description: "This is a budget camping tour."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 years",
          description: "The minimum age for this tour is 2 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi to Samburu National Reserve', mainDestination: 'Samburu National Reserve', nights: '1', hotel: `Umoja Campsite`, activity: `You'll start your journey where you will be picked up from the airport or hotel. You'll drive in the wild semi-arid landscape part of Northern Kenya in Samburu National Reserve. You'll arrive in time for lunch and check-in. Later, you'll proceed for an afternoon game drive. Expect to see the large numbers of animals and birdlife. Combining Shaba and Buffalo Springs National Park Samburu is popular for hosting the unique rare northern Kenya animal species known as the special five which are not found in other national parks and reserves in Kenya. Home to all African cats (lion, cheetah, and leopard). Other games include elephants, buffaloes, warthogs, hippos, impalas, waterbucks, and other wildlife. Bird species include kingfishers, bee-eaters, tawny, guinea fowl, yellow-throated, and superb starling. Samburu National Park is combined with the beautiful locals of the Samburu tribe they are the pillar of the area.
Your accommodation and meals will be at Umoja Camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Full-Day Game Drive in Samburu National Reserve', mainDestination: 'Samburu National Reserve', nights: '1', hotel: `Umoja Campsite`, activity: `After an early morning breakfast, you'll proceed for a full-day game drive at Samburu National Reserve with a picnic lunch. Still, you will enjoy the wilderness safari like Samburu. You'll go back to the camp where you will be served a delicious Kenyan dinner.

You will go back for dinner and an overnight stay at Umoja Camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Depart to Nairobi', mainDestination: 'Nairobi (City)', nights: '1', hotel: ``, activity: `Nairobi (City)`, image: 'Maasai Mara' },
 ],
whatToExpect:[
   "Begin your journey from Nairobi to Samburu National Reserve, a semi-arid wilderness in Northern Kenya renowned for its rugged landscapes and unique wildlife.",  
  "Spot the rare Samburu Special Five—Grevy’s zebra, reticulated giraffe, Somali ostrich, Beisa oryx, and gerenuk—species not found in other parks.",  
  "Enjoy thrilling game drives with opportunities to encounter elephants, lions, leopards, cheetahs, buffalo, and an incredible variety of birdlife.",  
  "Immerse yourself in the cultural heritage of the Samburu people, known for their vibrant traditions and warm hospitality.",  
  "Conclude your adventure with a final game drive before returning to Nairobi, carrying unforgettable memories of Samburu’s wildlife and culture."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  }, 
    {
    id: '3-day-mount-kenya-trek-sirimon-to-chogoria',
    title: `3-Day Mount Kenya Trek Sirimon to Chogoria`,
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 989,
    rating: 5,
    reviews: 1280,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 989,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Ascend Mount Kenya via Sirimon and descend through scenic Chogoria on this 3-day adventure. You'll trek from forest to alpine meadows, summit Point Lenana (4,985m) at sunrise, then explore the Gorges Valley, Lake Michaelson, and Nithi Falls. A perfect short trek combining diverse landscapes, wildlife, and panoramic views across Africa’s second-highest mountain.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour includes mountain huts and camping."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 18 years",
          description: "The minimum age for this tour is 18 years."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi - Sirimon Gate – Judmaier Camp', mainDestination: 'Mount Kenya', nights: '1', hotel: `Judmaier Campsite`, activity: `Hiking Distance: 8Kms
Duration: 3-4hrs
You'll leave Nairobi at 7:00 am and proceed to Sirimon Gate, where you will have lunch and begin your trek. From the gate follow the track as it winds uphill though the forest which later becomes heath land up-to Old Moses camp 3,300m at sea level.
Your dinner and overnight stay will be at the Old Moses camp cabin.`, image: 'Maasai Mara' },
{ day: 2, location: 'Judmaier Camp - Shiptons Camp', mainDestination: 'Mount Kenya', nights: '1', hotel: `Shipton Campsite`, activity: `Hiking Distance: 16Kms
Duration: 6hrs
After breakfast, you'll follow the track uphill, forking left at the junction. After one hour from Old Moses Camp, the track crosses the Ontulili River. You'll go right contouring through the Moorland and crossing Likii North, and continue uphill to Mackinder’s Valley, from where there are panoramic views up the valley towards the main peaks.
Your dinner and overnight stay will be at Shipton's Camp, 4,200m above sea level.`, image: 'Maasai Mara' },
{ day: 3, location: 'Shiptons Camp - Point Lenana - Chogoria Gate', mainDestination: 'Nairobi (City)', nights: '1', hotel: ``, activity: `Hiking Distance: 24Kms
Duration: 14hrs
You'll leave at 2:00 am up a steep stony quarry that cuts through a cliff, clearing visible part towards Harris Tarn, arriving point Lenana(4,985m at sea level) at 6:20 am, taking about 3 hours. After the sunrise, you'll descend to Mintos Camp for a hearty breakfast. After a short rest, you'll continue descending to the Road-head for lunch. Here, you will have the opportunity to visit Nithi Waterfalls before heading down to Chogoria gate, where you'll check out the park and board a 4WD vehicle for a drop off at Chogoria Town, where you will say goodbye to the team. Later, you'll board a waiting car for a transfer back to Nairobi.`, image: 'Maasai Mara' },
],
whatToExpect:[
  "Embark on an adventurous trek up Mount Kenya, Africa’s second-highest mountain, beginning your journey from Nairobi to the Sirimon Gate trailhead.",  
  "Experience diverse landscapes as you hike through lush forest, heathland, and scenic moorland, with breathtaking views unfolding at every step.",  
  "Challenge yourself with a rewarding trek to Point Lenana at 4,985m, arriving in time for a magical sunrise over the rugged peaks.",  
  "Descend through the dramatic Chogoria route, with highlights including Mintos Camp, the Road-head, and the stunning Nithi Waterfalls.",  
  "Enjoy full support from professional guides, hearty meals, and comfortable mountain camps, ensuring an unforgettable, safe, and enriching climbing experience."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '3-day-the-amboseli-budget-safari',
    title: `3-Day The Amboseli Budget Safari`,
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1111,
    rating: 5,
    reviews: 2139,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1111,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `A private, luxurious safari to Amboseli National Park is being offered, complete with a 4x4 Land Cruiser and an expert driver-guide. This excursion is special and healthy because of the view of the beautiful Mount Kilimanjaro, the vast herds of elephants, and the lyrical sounds of many kinds of birds at the swamp.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses tented camps."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Suitable for all ages",
          description: "This tour is suitable for children of all ages."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: "Jomo Kenyatta Airport (NBO)",
      endLocation: "Nairobi", 
      endAirport: "Jomo Kenyatta Airport (NBO)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi-Amboseli National Park', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Nyati Safari Camp`, activity: `On your first day, an Antonio Safaris representative at the Jomo Kenyatta International Airport (JKIA) or your Nairobi Hotel will meet you with a warmly welcome. You will then board your awaiting vehicle (4x4 Pop-up Roof Safari Land Cruiser) and depart for Amboseli. Arrive at Amboseli in time for check-in and lunch, after which you will proceed for an afternoon Game Drive in the Park.
Amboseli is home to the African Elephants, the gentle giants of the wild, and is host to iconic wildlife including four of the Big Five Wildlife species. The park offers an up-close encounter with herds of big-tusked African elephants that flock the park. Across the park’s open savannah grasslands, catch a glimpse of the Mount Kilimanjaro, Africa’s highest summit, which towers over the park across the border.`, image: 'Maasai Mara' },
{ day: 2, location: 'Amboseli National Park', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Nyati Safari Camp`, activity: `The entire day will be spent in Amboseli, with brief glimpses of Mount Kilimanjaro when the clouds part. After breakfast, you can choose to go on an afternoon game drive, or you can go on a full-day game drive with a packed lunch from 8 am to 4 pm. Your overnight accommodations and all meals are at Nyati Safari Camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Amboseli National Park- Nairobi', mainDestination: 'Nairobi (City)', nights: '', hotel: ``, activity: `After a leisurely breakfast, you will say your goodbyes to the Amboseli and drive back to Nairobi.
Drop off at your Nairobi Hotel or the Nairobi Airport.`, image: 'Maasai Mara' },

],
whatToExpect:[
 "Start your adventure with a scenic drive from Nairobi to Amboseli National Park, one of Kenya’s most iconic safari destinations.",  
  "Marvel at herds of African elephants roaming against the breathtaking backdrop of Mount Kilimanjaro, Africa’s tallest peak.",  
  "Enjoy thrilling game drives with opportunities to spot lions, cheetahs, buffalo, giraffes, zebras, and an abundance of birdlife.",  
  "Capture stunning views of Amboseli’s open plains, wetlands, and acacia woodlands, home to diverse wildlife and picturesque landscapes.",  
  "Conclude your safari with unforgettable memories of Amboseli’s wildlife encounters before returning to Nairobi."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
      {
    id: '3-day-tsavo-east-taita-safari-sentrim-salt-lick',
    title: `3-Day Tsavo East & Taita Safari (Sentrim & Salt Lick)`,
    location: 'Kenya',
    duration: '3 Days / 2 Nights',
    pricePerPerson: 1229,
    rating: 4.6,
    reviews: 3249,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1229,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Welcome to our Salt Lick Lodge and Tsavo safari. Explore the wide plains with a view of the forest-covered Taita Hills, a savannah with scrubland and rock formations. Huge-tusked elephants come to quench their thirst at the waterhole in front of the lodge. Enjoy the theater of the wilderness in Tsavo East and the safari feeling in the camp. All this awaits you on the safari! Let us take you closer to nature in style.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 year",
          description: "The minimum age for this tour is 1 year."
        }
      ],
      activitiesTransportation: {
        activities: "game drives & evening/night game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Mombasa",
      startAirport: "Moi Airport (MBA)",
      endLocation: "Mombasa", 
      endAirport: "Moi Airport (MBA)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Mombasa to Tsavo East National Park', mainDestination: 'Tsavo East National Park', nights: '1', hotel: `Lion Hill Lodge`, activity: `Nairobi highway. On the way, we will make a short stop at Kilimanjaro Restaurant and then drive to the Tsavo Gate, the "Theater of the Wild"!

As you enter the gate, you will be welcomed by the red earth of Tsavo. The nature trails, bush savannah, and the first sightings of wild animals shape your impression of real Africa.

We will make our first game drive through the park in search of wild animals. Tsavo is home to thousands of wildlife, and every minute, something great might pop up on the way. We arrive at the lodge in time for lunch. Check in and spend your midday to rest during the hottest time of the day.

In the evening, there is a second extended game drive through the park. Until the onset of dusk, you will explore the beauty of nature and its wildlife by Jeep. Filled with exciting impressions, we return for dinner and overnight at Sentrim Tsavo Camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Tsavo East National Park to Taita Salt Lick', mainDestination: 'Taita Hills Wildlife Sanctuary', nights: '1', hotel: `Salt Lick Safari Lodge`, activity: `We get up early for coffee or tea and set off on the early morning stalk at daybreak - the best time of the day to see the big cats! We roam the park and later return for a full, rich breakfast.

We pack our luggage and check out. We then make our last game drive in Tsavo, heading to the famous Taita Hill Sanctuary.

Salt Lick Safari Lodge is one of the world's most magnificent and photographed lodges with its awesome architecture. It is a lodge built on stilts. We arrive in time for lunch and check-in. After lunch, you have time to look around and relax.

In the afternoon, we start the game drive through the area and explore nature with the animal inhabitants until sunset. We return to Salt Lick Lodge to spend the night.

Optionally, we can opt to do the night game drive, which makes this park unique.

A nice evening awaits us at dinner, watching the animals approach the waterholes.`, image: 'Maasai Mara' },
{ day: 3, location: 'Taita Salt Lick Lodge to Mombasa', mainDestination: 'Mombasa Beaches', nights: '1', hotel: ``, activity: `On this fine day, we wake up early, grab a cup of coffee and head on an early stalk before returning for a full breakfast.

We pack our bags and check out. Once again, we roam the area in search of wild animals for the last time before making our way back to Diani/Mombasa.

We take a lunch break at Kilimanjaro Restaurant, after which we continue to the coast to your hotel or cottage.

This is the end of your pure Kenya experience!`, image: 'Maasai Mara' },


],
whatToExpect:[
  "Begin your journey with a scenic drive to Tsavo East National Park, famous for its red soil, vast savannahs, and diverse wildlife.",  
  "Experience exciting game drives in search of elephants, lions, giraffes, buffalo, zebras, and more in the heart of Tsavo.",  
  "Continue to the breathtaking Taita Hills Wildlife Sanctuary and stay at the iconic Salt Lick Safari Lodge, built on stilts above waterholes.",  
  "Enjoy both daytime and optional night game drives, offering unique chances to spot nocturnal animals and unforgettable wildlife encounters.",  
  "Conclude your safari with a final game drive before returning to Mombasa, carrying memories of Kenya’s rich landscapes and wildlife."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '4-day-nairobi-amboseli-tsavo-east-mombasa-diani-watamu',
    title: `4-Day Nairobi-Amboseli-Tsavo East-Mombasa, Diani/Watamu`,
    location: 'Kenya',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1299,
    rating: 4.8,
    reviews: 2786,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1299,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `You will start your trip in Nairobi and end your trip in Mombasa, Kenya. You will visit Amboseli and Tsavo East. We will also book a beach holiday for you, either on the north coast or the south coast. You have the option between budget accommodation or luxury accommodation on this tour, and we can provide quotes for a group, family, and solo travelers.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 year",
          description: "The minimum age for this tour is 1 year."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof minivan",
        gettingThere: "pop-up roof minivan"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Nairobi",
      startAirport: " Jomo Kenyatta Airport (NBO)",
      endLocation: "Mombasa", 
      endAirport: "Moi Airport (MBA)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Nairobi to Amboseli', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Nyati Safari Camp`, activity: `We will pick you up from Nairobi Airport or your Nairobi hotel and drive to Amboseli National Park. The park is famous for its herds of elephants, as well as the Big Five, and the famous highest African mountain, Mount Kilimanjaro. You will arrive in time for lunch, and after lunch, you will proceed on an afternoon game drive. Dinner and overnight will be at the camp.`, image: 'Maasai Mara' },
{ day: 2, location: 'Amboseli', mainDestination: 'Amboseli National Park', nights: '1', hotel: `Nyati Safari Camp`, activity: `Enjoy an early morning breakfast, then leave for a full day game drive in the park with packed lunch. Amboseli has plenty of wildlife and an abundance of birdlife. It also offers the best view of the magnificent mountain, Mt. Kilimanjaro, the highest mountain in Africa. Later you will drive back to the camp. Dinner and overnight will be at the camp.`, image: 'Maasai Mara' },
{ day: 3, location: 'Amboseli - Tsavo East', mainDestination: 'Tsavo East National Park', nights: '1', hotel: `Boma Simba Safari Lodge`, activity: `Depart Amboseli after breakfast and drive to Tsavo East. Enjoy ride along famous Nairobi mombasa highway and arrive at the lodge for check-in. Have lunch, then proceed on an afternoon game drive in search of wildlife. Later we will drive back to the lodge for dinner and overnight at Boma safari lodge.`, image: 'Maasai Mara' },
{ day: 4, location: 'Tsavo East to Mombasa', mainDestination: 'Mombasa Beaches', nights: '1', hotel: ``, activity: `Enjoy an early morning breakfast, short enroute game drive then check out of the park and drive to Mombasa. You will arrive around lunchtime. We will be able to drop you at your hotel of choice.`, image: 'Maasai Mara' },

],
whatToExpect:[
  "Start your adventure in Nairobi and journey to Amboseli National Park, home to large elephant herds and breathtaking views of Mount Kilimanjaro.",  
  "Enjoy full-day and afternoon game drives in Amboseli, spotting the Big Five, giraffes, zebras, and diverse bird species across the open savannah.",  
  "Continue your safari to Tsavo East National Park, renowned for its red-soil landscapes, vast plains, and spectacular wildlife sightings.",  
  "Experience thrilling morning and afternoon game drives in Tsavo East, with opportunities to encounter lions, elephants, buffalo, and more.",  
  "Conclude your journey with a scenic drive to Mombasa, where you’ll be dropped off at your beach hotel for relaxation by the Indian Ocean."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
      {
    id: '4-day-mikumi-nyerere-unforgettable-adventures',
    title: `4-Day Mikumi NP & Nyerere NP Unforgettable Adventures`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1330,
    rating: 4.9,
    reviews: 3217,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1330,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Explore Mikumi's diverse savannahs, then venture into UNESCO-listed Nyerere National Park for encounters with iconic African wildlife. Carefully selected mid-range accommodations ensure comfort. Join us for an unforgettable safari, immersing in the untamed beauty of Tanzania. Discover, encounter, and savor the charm of these remarkable national parks`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses lodges."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 2 year",
          description: "The minimum age for this tour is 2 year."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof minivan",
        gettingThere: "pop-up roof minivan"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Dar Es Salaam",
      startAirport: "Julius Nyerere Airport (DAR)",
      endLocation: "Dar Es Salaam", 
      endAirport: "Julius Nyerere Airport (DAR",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Dar es Salaam to Mikumi and Game Drive', mainDestination: 'Mikumi National Park', nights: '1', hotel: `Camp Bastian Mikumi`, activity: `You will be picked up from the airport, hotel, or ferry and drive to Mikumi National Park, which is approximately a 6-hour drive. Stop in Morogoro for lunch and proceed to Mikumi National Park. On arrival in the park, you will immediately start an afternoon to evening game drive. You will return to the lodge for relaxation, dinner, and overnight at Mikumi Bandaz.`, image: 'Maasai Mara' },
{ day: 2, location: 'Mikumi and Selous Boat Safari', mainDestination: 'Nyerere National Park', nights: '1', hotel: `Mloka Safari Lodge`, activity: `We'll have an early morning game drive in Mikumi. We will then have breakfast and drive to Selous (Nyerere National Park). On arrival, you will enjoy lunch and then start with an evening boat safari along the mighty Rufiji River. You will discover the Rufiji River by boat and encounter hippos and crocodiles in good numbers. Some 350 species of birds have been recorded in Selous. These are typical of the Miombo woodlands, and the birdlife supported by the Rufiji swamp lands is particularly interesting. You will have dinner and overnight at Mloka Safari Lodge.`, image: 'Maasai Mara' },
{ day: 3, location: 'Guided Game Drive in Nyerere NP', mainDestination: 'Nyerere National Park', nights: '1', hotel: `Mloka Safari Lodge`, activity: `After breakfast, you go for a full-day game drive with packed lunch boxes in Selous. You will enjoy a picnic lunch at the site the guide will select. After your picnic lunch and some relaxation, you continue the game drive until the evening. Dinner and your overnight stay are at Mloka Safari Lodge.`, image: 'Maasai Mara' },
{ day: 4, location: 'Walking Safari - Selous to Dar es Salaam', mainDestination: 'Dar Es Salaam (City)', nights: '1', hotel: ``, activity: `Start the day with a morning walking safari, which takes around two and a half hours. Return to your camp and have breakfast. You will then relax a bit and enjoy the environment of the lodge. After that, drive back to Dar es Salaam.

On arrival in Dar es Salaam, you will be dropped off at the airport for your flight back home, the hotel, or the ferry to Zanzibar or Mafia Island.`, image: 'Maasai Mara' },
],
whatToExpect:[
   "Begin your adventure with a scenic drive from Dar es Salaam to Mikumi National Park, where you’ll enjoy thrilling afternoon and morning game drives.",  
  "Explore Mikumi’s vast savannahs, home to elephants, lions, giraffes, zebras, and abundant birdlife.",  
  "Continue to Nyerere National Park (Selous) for a unique boat safari along the Rufiji River, spotting hippos, crocodiles, and vibrant bird species.",  
  "Experience a full-day game drive in Selous, one of Africa’s largest protected areas, teeming with wildlife and breathtaking landscapes.",  
  "Conclude with a guided walking safari before returning to Dar es Salaam, carrying unforgettable memories of Tanzania’s wild beauty."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
     {
    id: '3-day-budget-safari-tarangire-ngorongoro-manyara',
    title: `3-Day Budget Safari Tarangire/Ngorongoro Crater/Manyara`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1249,
    rating: 5,
    reviews: 3893,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1249,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `You'll go on a 3-day, 2-night safari in Tanzania and explore the stunning Tarangire, Ngorongoro Crater, and Lake Manyara. You'll enjoy a private tour with an expert guide in a comfortable safari jeep that has sockets and a fridge. Throughout your trip, unlimited water will be provided, making sure you stay refreshed and enjoy the beauty of Tanzania’s natural wonders.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses hotels."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 5 year",
          description: "The minimum age for this tour is 5 year."
        }
      ],
      activitiesTransportation: {
        activities: "game drives",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Arusha",
      startAirport: "Kilimanjaro Airport (JRO)",
      endLocation: "Dar Es Salaam", 
      endAirport: "Arusha Airport (ARK)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Arusha/JRO Airport – Tarangire National Park', mainDestination: 'Tarangire National Park', nights: '1', hotel: `Fig Lodge`, activity: `When you arrive at Arusha/JRO Airport, our tour guide will greet you with your lunch box ready. You will then be driven to Tarangire National Park, where you’ll check in at the park gate and start the game drive. Keep an eye out for herds of elephants and the iconic baobab trees. After the game drive, we’ll take you to your lodge for dinner and an overnight stay.

Tarangire is known for its large elephant herds and stunning baobab trees. While exploring, you'll have the chance to see a variety of wildlife, such as zebras, impalas, lions, cheetahs, and leopards, all in their natural environment.`, image: 'Maasai Mara' },
{ day: 2, location: 'Karatu – Ngorongoro Crater', mainDestination: 'Ngorongoro Crater', nights: '1', hotel: `Fig Lodge`, activity: `After breakfast, you’ll begin your scenic journey to Ngorongoro Crater for a game drive. You’ll descend into the crater to see the Big Five and other fascinating wildlife. After the game drive, you’ll return to Karatu for your overnight stay.

Ngorongoro Crater, often called 'Africa's Garden of Eden,' is a remarkable natural wonder in northern Tanzania. The huge crater was formed over 2.5 million years ago when a large volcano, about the size of Mount Kilimanjaro, erupted and collapsed.`, image: 'Maasai Mara' },
{ day: 3, location: 'Lake Manyara National Park – Arusha/JRO Airport', mainDestination: 'Lake Manyara National Park', nights: '1', hotel: ``, activity: `After breakfast, you’ll drive to Lake Manyara National Park for a game drive. Keep an eye out for the famous tree-climbing lions, large herds of elephants, and vibrant birdlife around the lake. After the game drive, you’ll head to Arusha/JRO Airport, marking the end of your safari.

Lake Manyara is a shallow, alkaline lake in northern Tanzania, known for its beautiful scenery and wide variety of wildlife. It’s part of Lake Manyara National Park, which includes lush forests, open grasslands, and hot springs. The lake is famous for its large flamingo flocks and tree-climbing lions, and its size changes depending on seasonal rainfall.`, image: 'Maasai Mara' },


],
whatToExpect:[
  "Start your journey at Tarangire National Park, famous for its vast elephant herds and striking baobab trees.",  
  "Enjoy thrilling game drives with opportunities to spot lions, leopards, cheetahs, zebras, and more wildlife roaming the savannah.",  
  "Descend into the Ngorongoro Crater, often called ‘Africa’s Garden of Eden,’ home to the Big Five and breathtaking landscapes.",  
  "Discover Lake Manyara National Park, renowned for its tree-climbing lions, elephants, flamingos, and diverse birdlife along the lakeshore.",  
  "Conclude your safari with unforgettable wildlife encounters and stunning scenery before returning to Arusha or JRO Airport."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
    {
    id: '4-day-safari-to-ruaha-national-park-tanzania',
    title: `4-Day Safari to Ruaha National Park Tanzania`,
    location: 'Tanzania',
    duration: '4 Days / 3 Nights',
    pricePerPerson: 1056,
    rating: 4.6,
    reviews: 2678,
    description: "",
    image: 'Elephants drinking at the Chobe Riverfront Botswana at sunset',
    tags: ['botswana', 'okavango delta', 'chobe', 'elephants', 'luxury', 'boating'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 1056,
    
    // OVERVIEW CONTENT
    overviewContent: {
      mainDescription: `Ruaha National Park is the second-largest park in Tanzania covering an area of 20,226sq km. The park has a high diversity of both flora and fauna and is considered the home of 10% of the remaining population of lions in Africa. Important information 1. The tour is private 2. Close encounter with wildlife 3. Small groups to ensure personal service 4. Free hotel pickup and drop off 5. Meal options are available, especially for vegetarians 6. Informative, friendly and professional driver-guide.`,
      tourFeatures: [
        {
          icon: <Home className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Budget tour",
          description: "This budget tour uses cottages."
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
          description: "If availability permits, this tour can start on any day of the year."
        },
        {
          icon: <Baby className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />,
          title: "Minimum age of 1 year",
          description: "The minimum age for this tour is 1 year."
        }
      ],
      activitiesTransportation: {
        activities: " game drives & walking safaris (with an armed guide)",
        gameVehicle: "pop-up roof 4x4 vehicle",
        gettingThere: "pop-up roof 4x4 vehicle"
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
      "title": "All transportation",
      "subtitle": "(Unless labeled as optional)"
    },
    {
      "title": "All Taxes/VAT",
      "subtitle": null
    },
    {
      "title": "A professional driver/guide",
      "subtitle": null
    },
    {
      "title": "Meals",
      "subtitle": "(As specified in the day-by-day section)"
    },
    {
      "title": "Drinking water",
      "subtitle": "(On all days)"
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
    }
  ]
},

    gettingThere: {
      startLocation: "Iringa",
      startAirport: " Julius Nyerere Airport (DAR)",
      endLocation: "Dar Es Salaam", 
      endAirport: " Julius Nyerere Airport (DAR)",
      airportTransfer: "A transfer from and back to the airport is included",
      internationalFlights: "We can help book your international flights, but you'll have to pay them yourself ",
      additionalAccommodation: "Additional accommodation before and at the end of the tour can be arranged for an extra cost"
    },
    itinerary: [
{ day: 1, location: 'Iringa -Ruaha National Park', mainDestination: 'Ruaha National Park', nights: '1', hotel: `TANAPA Ruaha Cottages`, activity: `After you arrive, you will be picked up from the airport and driven directly to a nice hotel for breakfast. After breakfast, continue to Ruaha National Park. The drive will take almost 2 hours and a half or more depending on what is to be found on the way. On arrival, check-in and get ready for hot lunch. After lunch, enjoy a little leisure time then depart for the afternoon game drive in the magnificent Ruaha National Park. Ruaha is rich with lots of different animals e.g. antelopes, giraffes, buffaloes, lions, leopards, elephants, cheetahs, and lots more to be offered.
Dinner and your overnight stay are at the cottage.
Meal plan: Lunch and dinner.`, image: 'Maasai Mara' },
{ day: 2, location: 'Ruaha National Park', mainDestination: 'Ruaha National Park', nights: '1', hotel: `TANAPA Ruaha Cottages`, activity: `Have an early morning breakfast then leave for the full-day game drive. Lunch will be served at the picnic site in the park. After lunch, proceed with a game drive until evening time when you'll drive back to the cottage.`, image: 'Maasai Mara' },
{ day: 3, location: 'Ruaha National Park', mainDestination: 'Ruaha National Park', nights: '1', hotel: `TANAPA Ruaha Cottages`, activity: `At sunrise, enjoy a wonderful walking safari for about 2 to 3 hours walk along the Great Ruaha River with two armed rangers. There is a possibility of viewing hippos, crocodiles, lions, and lots of other animals that comes to drink water in the river. Later, come back for breakfast. Enjoy the afternoon time leisure then continue with the game drive until 6:00 pm.
Dinner and your overnight stay are at the cottage.
Meal plan: Breakfast, lunch, and dinner.`, image: 'Maasai Mara' },
{ day: 4, location: 'Ruaha National Park - Iringa', mainDestination: 'Iringa (City)', nights: '1', hotel: ``, activity: `Early morning game drives start at 6:30 am until 9:30 am. Then you'll get back for breakfast which will be served at the cottage. After breakfast, collect all your belongings and depart for the drive to Iringa with a game drive en-route as you head out of the park.
Meal plan: Breakfast
You'll be dropped off at the airport.`, image: 'Maasai Mara' },

],
whatToExpect:[
    "Explore the remote and unspoiled Ruaha National Park, Tanzania’s largest national park known for its dramatic landscapes and rich wildlife.",  
  "Enjoy thrilling morning, afternoon, and full-day game drives with opportunities to spot lions, leopards, cheetahs, elephants, buffaloes, giraffes, and more.",  
  "Experience a unique walking safari along the Great Ruaha River, guided by armed rangers, offering close encounters with hippos, crocodiles, and diverse birdlife.",  
  "Relax at TANAPA Ruaha Cottages after adventurous days, enjoying delicious meals and the peaceful wilderness atmosphere.",  
  "Conclude your safari with a scenic game drive as you exit the park, leaving with unforgettable memories of Tanzania’s wild beauty."  
 ],
    nextTrip: 'namibia-desert-wildlife',
    prevTrip: 'zambia-walking-safari',
    suggestedTrips: [
      { id: 'zambia-walking-safari', title: 'Zambia Walking Safari Adventure', duration: '9 Days', image: 'Walking safari group in South Luangwa National Park Zambia', pricePerPerson: 4500, location: 'Zambia' },
      { id: 'namibia-desert-wildlife', title: 'Namibia Desert & Wildlife', duration: '12 Days', image: 'Oryx on Sossusvlei dunes Namibia', pricePerPerson: 4700, location: 'Namibia' }
    ]
  },
   
  
];

// ========================================
// ENHANCED DYNAMIC SIDEBAR CONTENT
// ========================================
const DynamicSidebarContent = ({ contentHeight, activeTab, tour }) => {
  const [visibleContent, setVisibleContent] = useState([]);

  useEffect(() => {
    const calculateVisibleContent = () => {
      const baseFormHeight = 1000;
      const availableHeight = Math.max(contentHeight - baseFormHeight - 100, 200);
      
      const contentSections = [];
      
      if (['inclusions', 'getting-there'].includes(activeTab)) {
      //  contentSections.push('trust');
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

// ========================================
// MAIN TOUR DETAIL PAGE COMPONENT
// ========================================
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

  // NEW: Redesigned Animal Availability Section based on inspiration
  const renderAnimalAvailabilitySection = (tourId, day) => {
    try {
      const animalData = getAnimalAvailabilityForDay(tourId, day);
      if (!animalData || !animalData.animals || animalData.animals.length === 0) return null;

      const sortedAnimals = sortAnimalsByAbundance(animalData.animals);
      const dayKey = `${tourId}-day-${day}`;
      const isShowingMore = showMoreAnimals[dayKey] || false;
      
      // Show 5 animals on desktop, 3 on mobile by default
      const animalsToShow = typeof window !== 'undefined' && window.innerWidth >= 768 ? 5 : 3;
      const visibleAnimals = isShowingMore ? sortedAnimals : sortedAnimals.slice(0, animalsToShow);
      const hiddenCount = Math.max(0, sortedAnimals.length - animalsToShow);

      return (
<motion.div
  className="mt-4 sm:mt-6 lg:mt-8 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-lg p-4 sm:p-6 lg:p-8"
  style={{ backgroundColor: 'rgb(30, 30, 35)' }}
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Seasonal Information Cards (Unchanged as per request) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-800/60 rounded-lg sm:rounded-xl border border-gray-600/50">
      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mt-1 flex-shrink-0" />
      <div>
        <h5 className="font-semibold text-gray-200 text-xs sm:text-sm mb-1">Best Time To Visit</h5>
        <p className="text-gray-300 text-xs leading-relaxed">{animalData.bestTimeToVisit}</p>
      </div>
    </div>
    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-800/60 rounded-lg sm:rounded-xl border border-gray-600/50">
      <div className="flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
      </div>
      <div>
        <h5 className="font-semibold text-gray-200 text-xs sm:text-sm mb-1">High Season</h5>
        <p className="text-gray-300 text-xs leading-relaxed">{animalData.highSeason}</p>
      </div>
    </div>
    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-800/60 rounded-lg sm:rounded-xl border border-gray-600/50 sm:col-span-2 lg:col-span-1">
      <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mt-1 flex-shrink-0" />
      <div>
        <h5 className="font-semibold text-gray-200 text-xs sm:text-sm mb-1">Best Weather</h5>
        <p className="text-gray-300 text-xs leading-relaxed">{animalData.bestWeather}</p>
      </div>
    </div>
  </div>

  {/* --- Wildlife Section (Visually Upgraded) --- */}
  <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-4 sm:p-6 lg:p-8">
    
    {/* Enhanced Wildlife Section Title */}
    <div className="flex justify-center items-center gap-3 text-center mb-6 sm:mb-8 lg:mb-10">
      <PawPrint className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500" />
      <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
        Wildlife in {animalData.mainDestination}
      </h4>
    </div>
    
    {/* Improved Responsive Animals Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <AnimatePresence>
        {visibleAnimals.map((animal, idx) => {
          const abundanceInfo = getAbundanceInfo(animal.abundance);
          return (
            <motion.div
              key={`animal-${dayKey}-${animal.name}-${idx}`}
              className="group text-center bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Animal Image with circular frame - brightness filter removed for full color */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-inner">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none'; // Hide broken image
                    e.target.nextElementSibling.style.display = 'flex'; // Show fallback
                  }}
                />
                {/* Fallback icon if image fails to load */}
                <div className="w-full h-full items-center justify-center text-slate-500 hidden">
                  <AnimalIcon type={animal.name} className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </div>
              
              {/* Animal Name with improved typography */}
              <h5 className="font-bold text-slate-800 text-sm sm:text-base mb-2 truncate group-hover:text-blue-600 transition-colors duration-300">
                {animal.name}
              </h5>
              
              {/* Abundance Indicator with refined styling */}
              <div className="flex items-center justify-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${abundanceInfo.dotColor}`}></div>
                <span className={`text-xs sm:text-sm font-medium text-slate-600`}>
                  {abundanceInfo.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>

    {/* Refined Show More/Less Button */}
    {hiddenCount > 0 && (
      <div className="text-center">
        <motion.button
          onClick={() => toggleShowMoreAnimals(dayKey)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-full text-slate-700 transition-all duration-300 text-sm font-medium hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isShowingMore ? (
            <>
              <span>Show less</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Show {hiddenCount} more</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    )}
  </div>
</motion.div>
      );
    } catch (error) {
      console.warn('Error rendering animal availability section:', error);
      return null;
    }
  };

  // ========================================
  // ENHANCED ACCOMMODATION CARD RENDERER
  // ========================================
  const renderAccommodationCard = (accommodation) => {
    if (!accommodation) {
      console.warn('🏨 renderAccommodationCard: No accommodation data provided');
      return null;
    }

    console.log('🏨 ✅ Rendering accommodation card:', {
      name: accommodation.name,
      id: accommodation.id,
      images: accommodation.images?.length || 0,
      type: 'accommodation_render'
    });

    const visiblePhotos = accommodation.images?.slice(0, photosToShow - 1) || [];
    const remainingCount = Math.max(0, (accommodation.images?.length || 0) - visiblePhotos.length);

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
        
        {/* Enhanced Photo Grid with Error Handling */}
        {accommodation.images && accommodation.images.length > 0 && (
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
                onError={(e) => {
                  console.warn(`🏨 Image failed to load: ${image}`);
                  e.target.style.opacity = '0.5';
                }}
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
        )}
        
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

  // ========================================
  // ENHANCED ITINERARY CONTENT RENDERER WITH DEBUGGING
  // ========================================
  const renderItineraryContent = (dayRange) => (
    <div className="space-y-8">
      {dayRange?.map((item, index) => {
        // Check if this is the last day - skip accommodation for last day
        const isLastDay = index === dayRange.length - 1;
        
        console.log('🏨 Processing itinerary day:', {
          day: item.day,
          item: item,
          index,
          isLastDay,
          tourId: tour.id,
          isCustom: tour.isCustom,
          type: 'itinerary_processing'
        });
        
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
              console.log('did we ever get here'),
              <motion.img 
                className="w-full h-full object-cover bg-bottom rounded-xl mb-6 shadow-lg cursor-pointer"
                alt={`Image for ${tour.isCustom ? 'step' : 'Day'} ${item.day}: ${item.location} - ${item.image}`}
                src={getDailyItineraryImage(tour.id, item.day)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">{item.activity}</p>
            
            {/* Animal Availability Section - Skip for last day and custom tours */}
            {!tour.isCustom && !isLastDay && renderAnimalAvailabilitySection(tour.id, item.day)}
            
            {/* ========================================
                ENHANCED ACCOMMODATION SECTION WITH DEBUGGING
                ======================================== */}
            {!tour.isCustom && !isLastDay && (() => {
              console.log('🏨 Attempting to get accommodation for:', {
                tourId: tour.id,
                day: item.day,
                dayType: typeof item.day,
                isLastDay,
                isCustom: tour.isCustom,
                type: 'accommodation_attempt'
              });
              
              const accommodation = getAccommodationForDay(tour.id, item.day);
              
              if (accommodation) {
                console.log('🏨 ✅ Accommodation found, rendering card:', {
                  tourId: tour.id,
                  day: item.day,
                  accommodationName: accommodation.name,
                  type: 'accommodation_success'
                });
                
                return (
                  <div className="mt-6 w-full">
                    <div className="max-w-full overflow-hidden">
                      {renderAccommodationCard(accommodation)}
                    </div>
                  </div>
                );
              } else {
                console.log('🏨 ❌ No accommodation found for this day:', {
                  tourId: tour.id,
                  day: item.day,
                  type: 'accommodation_not_found'
                });
                
                return (
                  <div className="mt-6 w-full p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-yellow-400" />
                      <p className="text-yellow-300 text-sm">
                        <strong>Debug:</strong> No accommodation configured for Day {item.day} (Tour: {tour.id})
                      </p>
                    </div>
                  </div>
                );
              }
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/10 to-transparent"></div>
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