import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, ArrowLeft, Clock, Star, Send, DollarSign, Briefcase, Sun, Moon, CloudDrizzle, CloudSnow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Data would ideally be in a shared file or fetched from an API.
// For now, ensure this data is consistent with TourDetailPage.jsx or refactor to a shared source.
const allToursData = [
  {
    id: 'custom-trip',
    title: 'Create Your Custom Safari',
    location: 'East Africa & Beyond',
    duration: 'Flexible',
    pricePerPerson: 0, // Custom
    rating: 0,
    reviews: 0,
    bestMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    budgetPlaceholder: 5000,
    image: 'Tailor-made safari planning session with maps and notes',
    overview: "Dreaming of a unique African adventure tailored exactly to your desires? Let us craft the perfect custom safari for you. Whether it's specific parks, unique activities, a particular pace, or special occasions, our experts are here to bring your vision to life. Tell us your travel dreams, and we'll handle the rest!",
    itinerary: [
      { day: 1, location: 'Your Imagination', nights: 'Flexible', activity: 'Share your dream destinations, preferred activities, travel style, and budget with us. The more details, the better!', image: 'Collage of diverse African landscapes and wildlife' },
      { day: '...', location: 'Expert Consultation', nights: 'Flexible', activity: 'Our safari specialists will connect with you to refine your ideas, offer expert advice, and suggest hidden gems based on your interests.', image: 'Safari expert discussing itinerary with clients over a map' },
      { day: '...', location: 'Personalized Itinerary Crafting', nights: 'Flexible', activity: 'We will design a day-by-day itinerary complete with handpicked accommodations, exclusive experiences, and seamless logistics, all tailored to you.', image: 'Beautifully designed custom safari itinerary document' },
      { day: '...', location: 'Your Unforgettable Safari', nights: 'Flexible', activity: 'Embark on your one-of-a-kind journey, knowing every detail has been thoughtfully arranged for an extraordinary African experience.', image: 'Happy travelers on a custom safari adventure in Africa' }
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
    tags: ['custom', 'tailor-made', 'personalized', 'luxury', 'adventure', 'family', 'honeymoon'],
    nextTrip: 'kenya-classic',
    prevTrip: null,
    suggestedTrips: [],
    isCustom: true,
  },
  {
    id: 'kenya-classic',
    title: 'Kenya Classic Safari',
    location: 'Kenya',
    duration: '10 Days / 9 Nights',
    pricePerPerson: 2950,
    rating: 4.9,
    reviews: 210,
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    budgetPlaceholder: 3000,
    image: 'Elephants walking in front of Mount Kilimanjaro in Amboseli National Park Kenya',
    overview: "Experience Kenya's iconic national parks, from the rolling plains of Masai Mara to the elephant herds of Amboseli with Kilimanjaro's backdrop, and the flamingos of Lake Nakuru. This itinerary combines thrilling wildlife experiences, serene landscapes, and cultural immersion for a well-rounded Kenyan adventure.",
    itinerary: [
      { day: 1, location: 'Nairobi (NBO)', nights: 1, activity: 'Arrival at Jomo Kenyatta International Airport (NBO). Transfer to your city hotel. Relax and acclimatize. Optional: Visit the Giraffe Centre or Sheldrick Wildlife Trust.', image: 'Nairobi city skyline with a giraffe in the foreground' },
      { day: '2-4', location: 'Masai Mara National Reserve', nights: 3, activity: 'Fly to Masai Mara. Afternoon game drive. Full days exploring the Mara, searching for the Big Five. Optional hot air balloon safari at dawn. Visit a traditional Maasai village.', image: 'Lion pride resting on the savanna in Masai Mara' },
      { day: 5, location: 'Lake Nakuru National Park', nights: 1, activity: 'Drive to Lake Nakuru, famous for its flamingos and rhino sanctuary. Afternoon game drive.', image: 'Pink flamingos wading in Lake Nakuru' },
      { day: '6-7', location: 'Amboseli National Park', nights: 2, activity: 'Drive to Amboseli, known for large elephant herds and stunning views of Mount Kilimanjaro. Game drives. Visit Observation Hill for panoramic views.', image: 'Elephants with Mount Kilimanjaro in the background Amboseli' },
      { day: 8, location: 'Tsavo West National Park', nights: 1, activity: 'Drive to Tsavo West. Explore Mzima Springs (hippos & crocodiles) and the Shetani Lava Flows.', image: 'Hippos submerged in Mzima Springs Tsavo West' },
      { day: 9, location: 'Nairobi', nights: 1, activity: 'Morning game drive in Tsavo West. Drive or fly back to Nairobi. Farewell dinner at a renowned restaurant.', image: 'Safari vehicle driving through Tsavo West landscape' },
      { day: 10, location: 'Departure', nights: 0, activity: 'Transfer to Jomo Kenyatta International Airport (NBO) for your departure.', image: 'Airplane taking off over the African savanna at sunset' },
    ],
    whatToExpect: [
      'Close encounters with the "Big Five" (Lion, Leopard, Elephant, Rhino, Buffalo).',
      'Breathtaking landscapes, from open savannas to volcanic mountains.',
      'Stays in carefully selected lodges and tented camps offering comfort and immersion in nature.',
      'Knowledgeable and experienced local safari guides.',
      'Opportunities for cultural interaction with the Maasai people.',
    ],
    tags: ['kenya', 'big five', 'family', 'luxury', 'migration (seasonal)'],
    nextTrip: 'tanzania-great-migration',
    prevTrip: 'custom-trip',
    suggestedTrips: [
      { id: 'tanzania-great-migration', title: 'Tanzania Great Migration', duration: '8 Days', image: 'Wildebeest migration crossing the Mara River in Serengeti Tanzania' },
      { id: 'uganda-gorilla-trek', title: 'Uganda Gorilla & Wildlife Trek', duration: '7 Days', image: 'Close-up of a silverback mountain gorilla in Bwindi Impenetrable Forest Uganda' }
    ]
  },
  {
    id: 'tanzania-great-migration',
    title: 'Tanzania Great Migration',
    location: 'Tanzania',
    duration: '8 Days / 7 Nights',
    pricePerPerson: 3500,
    rating: 5.0,
    reviews: 180,
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    budgetPlaceholder: 3800,
    image: 'Wildebeest migration crossing the Mara River in Serengeti Tanzania',
    overview: "Witness the awe-inspiring Great Wildebeest Migration in the Serengeti, explore the Ngorongoro Crater, a UNESCO World Heritage site, and discover Tarangire's giant baobabs and large elephant herds. A journey through Tanzania's most famous wildlife havens.",
    itinerary: [
        { day: 1, location: 'Kilimanjaro (JRO) / Arusha', nights: 1, activity: 'Arrival at Kilimanjaro Int. Airport (JRO). Transfer to your lodge in Arusha. Pre-safari briefing.', image: 'View of Mount Meru from Arusha town' },
        { day: 2, location: 'Tarangire National Park', nights: 1, activity: 'Drive to Tarangire. Afternoon game drive. Known for its large elephant population and baobab trees.', image: 'Elephants near baobab trees in Tarangire National Park' },
        { day: '3-5', location: 'Serengeti National Park (Central/North)', nights: 3, activity: 'Fly to Serengeti. Days dedicated to following the Great Migration (seasonal location). Extensive game drives. Optional Serengeti hot air balloon.', image: 'Cheetah scanning the plains in Serengeti National Park' },
        { day: 6, location: 'Ngorongoro Crater', nights: 1, activity: 'Drive to Ngorongoro Conservation Area. Descend into the Ngorongoro Crater for a full day game drive. Picnic lunch by the hippo pool.', image: 'View into the Ngorongoro Crater with wildlife grazing' },
        { day: 7, location: 'Lake Manyara / Karatu', nights: 1, activity: 'Morning game drive in Lake Manyara National Park (optional, if time permits) or explore Karatu town and coffee plantations. Return to Arusha in the late afternoon.', image: 'Tree-climbing lions in Lake Manyara National Park' },
        { day: 8, location: 'Departure', nights: 0, activity: 'Transfer to Kilimanjaro Int. Airport (JRO) for your departure.', image: 'Safari vehicle driving towards the sunset in Tanzania' },
    ],
    whatToExpect: [
      'The chance to witness the Great Wildebeest Migration (timing dependent).',
      'Exceptional Big Five sightings in Serengeti and Ngorongoro Crater.',
      'Diverse ecosystems, from riverine forests to vast grasslands and volcanic calderas.',
    ],
    tags: ['tanzania', 'migration', 'wildlife', 'luxury', 'crater'],
    nextTrip: 'uganda-gorilla-trek',
    prevTrip: 'kenya-classic',
    suggestedTrips: [
      { id: 'kenya-classic', title: 'Kenya Classic Safari', duration: '10 Days', image: 'Elephants walking in front of Mount Kilimanjaro in Amboseli National Park Kenya' },
      { id: 'rwanda-primates-volcanoes', title: 'Rwanda Primates & Volcanoes', duration: '9 Days', image: 'Golden monkey sitting on a bamboo branch in Volcanoes National Park Rwanda' }
    ]
  },
  {
    id: 'uganda-gorilla-trek',
    title: 'Uganda Gorilla & Wildlife Trek',
    location: 'Uganda',
    duration: '7 Days / 6 Nights',
    pricePerPerson: 4200,
    rating: 4.8,
    reviews: 155,
    bestMonths: ['Jan', 'Feb', 'Jun', 'Jul', 'Aug', 'Sep', 'Dec'],
    budgetPlaceholder: 4500,
    image: 'Close-up of a silverback mountain gorilla in Bwindi Impenetrable Forest Uganda',
    overview: "An unforgettable journey to trek mountain gorillas in their natural habitat in Bwindi Impenetrable Forest, combined with classic savanna wildlife viewing in Queen Elizabeth National Park, including its famous tree-climbing lions and the Kazinga Channel boat cruise.",
    itinerary: [
        { day: 1, location: 'Entebbe (EBB)', nights: 1, activity: 'Arrival at Entebbe International Airport (EBB). Transfer to your hotel near Lake Victoria. Briefing about your upcoming adventure.', image: 'Sunset over Lake Victoria in Entebbe Uganda' },
        { day: 2, location: 'To Bwindi Impenetrable NP', nights: 1, activity: 'Scenic drive or domestic flight to the Bwindi region, home to nearly half of the world’s mountain gorillas.', image: 'Lush green hills of Bwindi Impenetrable Forest' },
        { day: 3, location: 'Gorilla Trekking in Bwindi', nights: 1, activity: 'The highlight! Embark on a guided trek through the rainforest to find and spend an hour with a mountain gorilla family. A truly moving experience.', image: 'Mountain gorilla family in the dense forest of Bwindi' },
        { day: 4, location: 'Queen Elizabeth National Park', nights: 1, activity: 'Drive to Queen Elizabeth NP. Afternoon game drive in the Kasenyi plains, known for lions and diverse antelope species.', image: 'Ugandan Kob antelopes grazing in Queen Elizabeth National Park' },
        { day: 5, location: 'Queen Elizabeth NP', nights: 1, activity: 'Morning game drive searching for tree-climbing lions in the Ishasha sector (seasonal). Afternoon Kazinga Channel boat cruise for hippos, crocodiles, and water birds.', image: 'Hippos in the Kazinga Channel Queen Elizabeth National Park' },
        { day: 6, location: 'Return to Entebbe', nights: 1, activity: 'Optional morning chimpanzee trekking in Kyambura Gorge. Drive or fly back to Entebbe. Relax or explore Entebbe town.', image: 'Chimpanzee swinging in Kyambura Gorge Uganda' },
        { day: 7, location: 'Departure', nights: 0, activity: 'Transfer to Entebbe International Airport (EBB) for your departure.', image: 'Traditional Ugandan fishing boats on Lake Victoria' },
    ],
    whatToExpect: [
      'A once-in-a-lifetime encounter with mountain gorillas in Bwindi.',
      'Diverse wildlife viewing in Queen Elizabeth NP, including potential tree-climbing lion sightings.',
      'Scenic boat cruise on the Kazinga Channel, teeming with hippos and birds.',
    ],
    tags: ['uganda', 'gorillas', 'primates', 'adventure', 'wildlife'],
    nextTrip: 'rwanda-primates-volcanoes',
    prevTrip: 'tanzania-great-migration',
    suggestedTrips: [
      { id: 'tanzania-great-migration', title: 'Tanzania Great Migration', duration: '8 Days', image: 'Wildebeest migration crossing the Mara River in Serengeti Tanzania' },
      { id: 'rwanda-primates-volcanoes', title: 'Rwanda Primates & Volcanoes', duration: '9 Days', image: 'Golden monkey sitting on a bamboo branch in Volcanoes National Park Rwanda' }
    ]
  },
  {
    id: 'rwanda-primates-volcanoes',
    title: 'Rwanda Primates & Volcanoes',
    location: 'Rwanda',
    duration: '9 Days / 8 Nights',
    pricePerPerson: 4800,
    rating: 4.9,
    reviews: 130,
    bestMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Dec', 'Jan', 'Feb'],
    budgetPlaceholder: 5000,
    image: 'Golden monkey sitting on a bamboo branch in Volcanoes National Park Rwanda',
    overview: "Discover Rwanda, 'the land of a thousand hills.' This luxury journey combines thrilling primate encounters – gorilla trekking in Volcanoes National Park and chimpanzee tracking in Nyungwe Forest – with stunning volcanic scenery, serene lakes, and poignant cultural experiences.",
    itinerary: [
        { day: 1, location: 'Kigali (KGL)', nights: 1, activity: 'Arrival at Kigali International Airport (KGL). Transfer to your hotel. Optional city tour including the Kigali Genocide Memorial.', image: 'Kigali city view with rolling hills in the background' },
        { day: 2, location: 'To Volcanoes National Park', nights: 1, activity: 'Scenic drive to Volcanoes NP, the base for gorilla trekking. Visit the Dian Fossey Gorilla Fund Museum.', image: 'View of the Virunga Volcanoes from a lodge in Rwanda' },
        { day: 3, location: 'Gorilla Trekking in Volcanoes NP', nights: 1, activity: 'An incredible day trekking to see one of the habituated mountain gorilla families.', image: 'Silverback gorilla in Volcanoes National Park Rwanda' },
        { day: 4, location: 'Golden Monkey Trek / Cultural Village', nights: 1, activity: 'Morning trek for the playful golden monkeys. Afternoon visit to the Iby’Iwacu Cultural Village for insights into Rwandan traditions.', image: 'Golden monkeys leaping through bamboo forest in Rwanda' },
        { day: 5, location: 'Lake Kivu', nights: 1, activity: 'Drive to Lake Kivu, one of Africa’s Great Lakes. Relax by the lake, enjoy optional boat tours or kayaking.', image: 'Scenic view of Lake Kivu with fishing boats' },
        { day: '6-7', location: 'Nyungwe Forest National Park', nights: 2, activity: 'Transfer to Nyungwe Forest, an ancient montane rainforest. Chimpanzee trekking and an exhilarating canopy walk above the forest.', image: 'Canopy walkway high above Nyungwe Forest Rwanda' },
        { day: 8, location: 'Return to Kigali', nights: 1, activity: 'Drive back to Kigali. Optional visit to the King’s Palace Museum in Nyanza en route. Last-minute souvenir shopping.', image: 'Traditional Rwandan dancers performing' },
        { day: 9, location: 'Departure', nights: 0, activity: 'Transfer to Kigali International Airport (KGL) for your departure.', image: 'Artisan crafts market in Kigali Rwanda' },
    ],
    whatToExpect: [
      'Close encounters with mountain gorillas and golden monkeys in Volcanoes NP.',
      'Chimpanzee trekking in the biodiverse Nyungwe Forest.',
      'Spectacular views from the Nyungwe Canopy Walk.',
    ],
    tags: ['rwanda', 'gorillas', 'chimpanzees', 'luxury', 'scenic', 'volcanoes'],
    nextTrip: 'ethiopia-historic-route',
    prevTrip: 'uganda-gorilla-trek',
    suggestedTrips: [
      { id: 'uganda-gorilla-trek', title: 'Uganda Gorilla & Wildlife Trek', duration: '7 Days', image: 'Close-up of a silverback mountain gorilla in Bwindi Impenetrable Forest Uganda' },
      { id: 'kenya-classic', title: 'Kenya Classic Safari', duration: '10 Days', image: 'Elephants walking in front of Mount Kilimanjaro in Amboseli National Park Kenya' }
    ]
  }
  // ... (I'll add many more tours here, up to 20+, ensuring diverse locations and experiences)
];


const DestinationDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const tour = allToursData.find(t => t.id === id);

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

  useEffect(() => {
    window.scrollTo(0,0);
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
  }, [id, tour]);

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

  const monthNameToIcon = (monthName) => {
    const lowerMonth = monthName.toLowerCase();
    if (['jun', 'jul', 'aug'].includes(lowerMonth)) return <Sun className="w-5 h-5 text-yellow-400" />;
    if (['sep', 'oct', 'nov'].includes(lowerMonth)) return <CloudDrizzle className="w-5 h-5 text-blue-400" />;
    if (['dec', 'jan', 'feb'].includes(lowerMonth)) return <Sun className="w-5 h-5 text-orange-500" />;
    if (['mar', 'apr', 'may'].includes(lowerMonth)) return <CloudDrizzle className="w-5 h-5 text-sky-500" />;
    return <Calendar className="w-5 h-5 text-gray-400" />;
  };


  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">The tour you are looking for does not exist or may have been moved.</p>
          <Link to="/tours">
            <Button className="bg-orange-500 hover:bg-orange-600">Back to Tours</Button>
          </Link>
        </div>
      </div>
    );
  }

  const otherTours = allToursData.filter(t => t.id !== id && !t.isCustom).sort(() => 0.5 - Math.random()).slice(0, 2);


  return (
    <div className="pt-20 md:pt-28 bg-slate-900 text-white">
      <section className="relative h-[60vh] md:h-[75vh]">
        <img 
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Hero image for ${tour.title} showing ${tour.image}`}
         src="https://images.unsplash.com/photo-1632178151697-fd971baa906f" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-20 container mx-auto px-4">
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
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Tour Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{tour.overview}</p>
            </motion.div>

            {!tour.isCustom && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Best Months to Visit</h2>
                <div className="flex flex-wrap gap-3">
                  {tour.bestMonths.map(month => (
                    <span key={month} className="flex items-center gap-2 bg-slate-800/70 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 shadow-md">
                      {monthNameToIcon(month)}
                      {month}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">{tour.isCustom ? "How It Works" : "Daily Itinerary"}</h2>
              <div className="space-y-8 relative">
                <div className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-orange-500/30 z-0"></div>
                
                {tour.itinerary.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 md:gap-6 items-start relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg">
                      {tour.isCustom ? index + 1 : `Day ${item.day}`}
                    </div>
                    <div className="flex-1 glass-effect rounded-xl p-5 md:p-6 shadow-lg">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                        <h3 className="text-xl md:text-2xl font-semibold text-orange-300">{item.location}</h3>
                        {!tour.isCustom && (
                            <span className="text-sm text-gray-400 mt-1 sm:mt-0">
                            <Briefcase className="w-4 h-4 inline mr-1.5" />
                            {item.nights > 0 ? `${item.nights} Night${item.nights > 1 ? 's' : ''}` : 'Transit/Activity'}
                            </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{item.activity}</p>
                      {item.image && (
                        <img 
                          className="w-full h-48 object-cover rounded-lg mt-3 shadow-md"
                          alt={`Image for ${tour.isCustom ? 'step' : 'Day'} ${item.day}: ${item.location} - ${item.image}`}
                         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">{tour.isCustom ? "Why Choose a Custom Safari?" : "What to Expect"}</h2>
              <ul className="space-y-3">
                {tour.whatToExpect.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <aside className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-28 glass-effect rounded-2xl p-6 md:p-8 shadow-xl">
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
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                      placeholder={tour.isCustom ? "e.g., 5000" : (tour.budgetPlaceholder || "e.g., 3500")}
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/60 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                      className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                      className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                      className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                      className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                    className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
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
                        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:ring-orange-400 focus:outline-none placeholder-gray-500"
                        required={tour.isCustom}
                    ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3.5 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2.5" />
                  {tour.isCustom ? "Send Custom Inquiry" : "Get Detailed Itinerary"}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-6 text-center">
                Our travel experts will contact you with a personalized itinerary and quote.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {otherTours.length > 0 && (
        <section className="py-12 md:py-16 border-t border-slate-700/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">You Might Also Like</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherTours.map((suggestedTour) => (
                <Link key={suggestedTour.id} to={`/tours/${suggestedTour.id}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    whileHover={{ y: -8 }}
                  >
                    <img 
                      className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      alt={`Suggested tour: ${suggestedTour.title} - ${suggestedTour.image}`}
                     src="https://images.unsplash.com/photo-1632178151697-fd971baa906f" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">{suggestedTour.title}</h3>
                      <p className="text-orange-400 text-sm">{suggestedTour.duration} - Starting from ${suggestedTour.pricePerPerson}</p>
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
                        <Button variant="outline" className="w-full border-orange-500/70 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200 transition-all duration-300 py-3 px-6 rounded-lg">
                            <ArrowLeft className="w-5 h-5 mr-2.5" />
                            Previous: {allToursData.find(t => t.id === tour.prevTrip)?.title.substring(0,20)}...
                        </Button>
                    </Link>
                    ) : <div className="w-full sm:w-auto"></div>}
                    
                    {tour.nextTrip && allToursData.find(t => t.id === tour.nextTrip) ? (
                    <Link to={`/tours/${tour.nextTrip}`} className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full border-orange-500/70 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200 transition-all duration-300 py-3 px-6 rounded-lg">
                            Next: {allToursData.find(t => t.id === tour.nextTrip)?.title.substring(0,20)}...
                            <ArrowRight className="w-5 h-5 ml-2.5" />
                        </Button>
                    </Link>
                    ) : <div className="w-full sm:w-auto"></div>}
                </div>
            </div>
        </section>
      )}
    </div>
  );
};

export default DestinationDetailPage;