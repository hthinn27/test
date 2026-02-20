
import { Character, CharacterId } from './types';

export const CHARACTERS: Record<CharacterId, Character> = {
  deer: {
    id: 'deer',
    name: 'Deer',
    icon: '🦌',
    ecosystem: 'Temperate Forest',
    description: 'A agile herbivore roaming the deep woods, sensitive to habitat changes.',
    initialHealth: 90,
    initialPop: 5, // Thriving
    initialBio: 5, // Optimal
    scenarios: [
      {
        round: 1,
        title: 'Morning in the Glade',
        narrative: 'The forest is lush. Rain has fallen, and fresh shoots are everywhere. You graze peacefully with your herd.',
        choices: [
          {
            text: 'Explore the deep forest for new plants',
            impact: { health: 5, pop: 0, bio: 0 },
            consequence: 'You find a rich hidden meadow, increasing your strength.',
            rippleEffect: 'By spreading seeds of rare plants, you strengthen the forest floor.',
            reflectionQuestion: 'How does an animal\'s movement help plant diversity?',
            visual: '🌿',
            explanation: 'Animals act as natural seed dispersers. By traveling to new areas after eating, you help plants migrate and colonize new territory, which is essential for forest regeneration.'
          },
          {
            text: 'Rest by the stream and drink',
            impact: { health: 0, pop: 0, bio: 0 },
            consequence: 'The water is clear and refreshing. Life is balanced.',
            rippleEffect: 'The stream ecosystem remains undisturbed.',
            reflectionQuestion: 'Why is clean water vital for all species in a forest?',
            visual: '💧',
            explanation: 'In a balanced ecosystem, natural resources like water are shared among all species. Maintaining low-impact behaviors ensures the stream remains a reliable resource for everyone.'
          },
          {
            text: 'Lead the herd to the edge of the woods',
            impact: { health: -5, pop: 0, bio: 0 },
            consequence: 'The air feels different here, closer to human paths.',
            rippleEffect: 'Exposure to edges increases stress and predator visibility.',
            reflectionQuestion: 'What are the dangers of living at the edge of a habitat?',
            visual: '🛣️',
            explanation: 'The "edge effect" occurs when a habitat is fragmented. Edges are often more dangerous due to increased exposure to predators, human activity, and different microclimates that native species aren\'t adapted to.'
          }
        ]
      },
      {
        round: 2,
        title: 'The Sound of Chainsaws',
        narrative: 'A large section of your home is being cleared. The trees you used for shelter are gone.',
        choices: [
          {
            text: 'Retreat deeper into the shrinking wild',
            impact: { health: -10, pop: -1, bio: -1 },
            consequence: 'You find safety, but the forest is now overcrowded.',
            rippleEffect: 'Competition for limited resources weakens all species.',
            reflectionQuestion: 'What happens when many animals are forced into a smaller space?',
            visual: '🪚',
            explanation: 'Habitat loss reduces the "carrying capacity" of the land. When too many animals are forced into a smaller area, competition for food and space increases, leading to stress and population decline.'
          },
          {
            text: 'Try to cross the newly built road to find a new forest',
            impact: { health: -20, pop: -1, bio: 0 },
            consequence: 'The road is terrifying. Some of the herd don\'t make it.',
            rippleEffect: 'Habitat fragmentation splits populations into isolated groups.',
            reflectionQuestion: 'How do roads impact wildlife migration?',
            visual: '🚗',
            explanation: 'Roads create physical barriers that fragment ecosystems. This prevents animals from reaching food, mates, and seasonal habitats, often leading to direct mortality from vehicle collisions.'
          },
          {
            text: 'Scavenge near the new human structures',
            impact: { health: -5, pop: 0, bio: -2 },
            consequence: 'You find food, but it is unnatural and makes you sluggish.',
            rippleEffect: 'Dependency on human food changes natural behaviors and health.',
            reflectionQuestion: 'Should wild animals be encouraged to eat human food?',
            visual: '🏠',
            explanation: 'Human food lacks the nutrients wild animals need. Dependency on "easy" food sources can lead to poor health and dangerous habituation, where animals lose their natural fear of humans.'
          }
        ]
      },
      {
        round: 3,
        title: 'The Industrial Bloom',
        narrative: 'A nearby factory releases smoke and chemicals. The plants you eat taste bitter, and the water is murky.',
        choices: [
          {
            text: 'Drink from the polluted stream anyway',
            impact: { health: -30, pop: -1, bio: -1 },
            consequence: 'Toxins build up in your body, and the young fall ill.',
            rippleEffect: 'Bioaccumulation moves toxins up the entire food chain.',
            reflectionQuestion: 'How does pollution in the water affect animals that don\'t live in it?',
            visual: '🏭',
            explanation: 'Industrial runoff introduces heavy metals and chemicals into the water. These toxins don\'t just disappear; they build up in animal tissues (bioaccumulation) and become more concentrated as they move up the food chain.'
          },
          {
            text: 'Search for the few remaining clean patches of forest',
            impact: { health: -15, pop: -2, bio: -1 },
            consequence: 'It takes days to find food. Your energy is depleted.',
            rippleEffect: 'As specialized plants die out, herbivores suffer first.',
            reflectionQuestion: 'Why is biodiversity important for an animal\'s diet?',
            visual: '🔍',
            explanation: 'A healthy ecosystem provides a variety of food sources. When pollution or habitat loss removes specific plants, animals must spend more energy searching for food, which reduces their overall survival rate.'
          },
          {
            text: 'Adapt by eating invasive garden plants nearby',
            impact: { health: -10, pop: -1, bio: -2 },
            consequence: 'You survive, but the local ecosystem loses its native balance.',
            rippleEffect: 'Overgrazing of specific plants can cause local extinction of species.',
            reflectionQuestion: 'What is the risk of invasive species in an ecosystem?',
            visual: '🥀',
            explanation: 'Invasive species often lack natural predators and can outcompete native plants. When animals switch to eating them, it can further disrupt the delicate balance between native flora and fauna.'
          }
        ]
      },
      {
        round: 4,
        title: 'The Crisis Point',
        narrative: 'A massive wildfire, fueled by a drying climate and human negligence, sweeps through the fragmented remains of your home.',
        choices: [
          {
            text: 'Flee toward a local human-managed wildlife bridge',
            impact: { health: 15, pop: 1, bio: 1 },
            consequence: 'You cross safely into a protected zone. Humans are helping.',
            rippleEffect: 'Conservation efforts can reconnect broken habitats.',
            reflectionQuestion: 'Can human engineering help fix ecological damage?',
            visual: '🌉',
            explanation: 'Wildlife corridors are engineered solutions that reconnect fragmented habitats. They allow animals to safely bypass human infrastructure, promoting genetic diversity and allowing species to escape disasters like wildfires.'
          },
          {
            text: 'Try to hide in a damp gully',
            impact: { health: -40, pop: -2, bio: -2 },
            consequence: 'The heat is unbearable. The forest is nearly gone.',
            rippleEffect: 'Extreme events can lead to total ecosystem collapse.',
            reflectionQuestion: 'How does climate change make natural disasters worse?',
            visual: '🔥',
            explanation: 'Climate change increases the frequency and intensity of extreme events. In a fragmented forest, animals have fewer places to hide, making them more vulnerable to catastrophic events like mega-fires.'
          },
          {
            text: 'Wait for the fire to pass and find hope in the ashes',
            impact: { health: -20, pop: -1, bio: -1 },
            consequence: 'Survival is hard, but some plants begin to sprout.',
            rippleEffect: 'Ecosystems can recover if given time and protection.',
            reflectionQuestion: 'How long do you think a forest takes to fully recover?',
            visual: '🌱',
            explanation: 'Ecological succession is the process by which an ecosystem recovers after a disturbance. While some species are "fire-adapted," the recovery of a full, mature forest can take decades or even centuries.'
          }
        ]
      }
    ]
  },
  turtle: {
    id: 'turtle',
    name: 'Sea Turtle',
    icon: '🐢',
    ecosystem: 'Coral Reef & Open Ocean',
    description: 'A long-lived traveler of the blue depths, witnessing the changing seas.',
    initialHealth: 90,
    initialPop: 5,
    initialBio: 5,
    scenarios: [
      {
        round: 1,
        title: 'The Vibrant Reef',
        narrative: 'The reef is a kaleidoscope of color. You graze on sea grass and float on warm currents.',
        choices: [
          { text: 'Feed in the seagrass meadows', impact: { health: 5, pop: 0, bio: 0 }, consequence: 'Nutritious grass keeps you healthy.', rippleEffect: 'Turtles keeping grass short helps it grow thicker and healthier.', reflectionQuestion: 'How do herbivores help maintain the ocean floor?', visual: '🌊', explanation: 'Sea turtles act as "lawnmowers" for seagrass. By grazing, they prevent the grass from growing too long and suffocating itself, which maintains a healthy habitat for many other marine species.' },
          { text: 'Rest in a coral crevice', impact: { health: 0, pop: 0, bio: 0 }, consequence: 'Safe from predators, you conserve energy.', rippleEffect: 'The coral remains a safe haven for thousands of species.', reflectionQuestion: 'Why are coral reefs called the "rainforests of the sea"?', visual: '🪸', explanation: 'Coral reefs provide structural complexity that offers protection and breeding grounds for 25% of all marine life. Resting here minimizes your energy use while benefiting from the reef\'s natural protection.' },
          { text: 'Follow a school of jellyfish', impact: { health: 5, pop: 0, bio: 0 }, consequence: 'A delicious feast for a hungry turtle.', rippleEffect: 'Controlling jellyfish populations keeps the food web balanced.', reflectionQuestion: 'What would happen if turtles stopped eating jellyfish?', visual: '🎐', explanation: 'Sea turtles are one of the few predators of jellyfish. By eating them, you prevent jellyfish "blooms" that could otherwise overconsume fish larvae and disrupt the entire marine food web.' }
        ]
      },
      {
        round: 2,
        title: 'Floating Hazards',
        narrative: 'The currents are bringing strange, transparent objects. Some look like your favorite jellyfish.',
        choices: [
          { text: 'Eat the floating "jellyfish"', impact: { health: -30, pop: -1, bio: 0 }, consequence: 'It is plastic. It clogs your stomach and makes you sick.', rippleEffect: 'Plastic pollution kills millions of marine animals every year.', reflectionQuestion: 'Why is plastic so dangerous to marine life?', visual: '🛍️', explanation: 'Marine animals often mistake plastic bags for jellyfish. Once ingested, plastic cannot be digested and can cause internal blockages, leading to starvation and death.' },
          { text: 'Avoid the debris and find a cleaner area', impact: { health: -10, pop: 0, bio: -1 }, consequence: 'You stay safe, but your usual feeding grounds are covered in trash.', rippleEffect: 'Marine debris smothers coral and sea grass.', reflectionQuestion: 'Where does most ocean plastic come from?', visual: '🗑️', explanation: 'Ocean plastic often originates from land-based sources like rivers and coastal runoff. Even if an animal avoids eating it, the trash can smother vital habitats like coral reefs and seagrass meadows.' },
          { text: 'Dive deeper to escape the surface clutter', impact: { health: -5, pop: 0, bio: 0 }, consequence: 'It\'s colder and darker, but cleaner.', rippleEffect: 'Changing depths can affect migration patterns.', reflectionQuestion: 'How do animals adapt to surface pollution?', visual: '⚓', explanation: 'While diving deep can avoid surface trash, it requires more energy and may take animals away from their primary food sources, which are often found in shallower, sunlit waters.' }
        ]
      },
      {
        round: 3,
        title: 'The Great Warming',
        narrative: 'The water is getting unusually hot. The coral reef is turning white and lifeless.',
        choices: [
          { text: 'Stay and search for food in the bleached coral', impact: { health: -20, pop: -1, bio: -2 }, consequence: 'The reef is dying. There is very little food left.', rippleEffect: 'Coral bleaching leads to a total loss of habitat for fish.', reflectionQuestion: 'What causes coral bleaching?', visual: '☀️', explanation: 'Coral bleaching occurs when rising water temperatures cause corals to expel the colorful algae living in their tissues. Without these algae, the coral loses its main food source and eventually dies.' },
          { text: 'Migrate to cooler northern waters', impact: { health: -15, pop: -1, bio: -1 }, consequence: 'The journey is long and exhausting. Many hatchlings don\'t survive.', rippleEffect: 'Species range shifts disrupt traditional marine ecosystems.', reflectionQuestion: 'How do ocean temperature affect animal migration?', visual: '🧭', explanation: 'As oceans warm, many species are forced to move toward the poles to find suitable temperatures. This "range shift" can disrupt existing food webs and lead to high mortality during long migrations.' },
          { text: 'Lay eggs on a beach with rising sea levels', impact: { health: -10, pop: -2, bio: 0 }, consequence: 'The tide washes away the nests. The next generation is lost.', rippleEffect: 'Habitat loss on land affects species that rely on beaches.', reflectionQuestion: 'How does sea-level rise affect coastal species?', visual: '🏖️', explanation: 'Rising sea levels and increased storm surges erode nesting beaches. For sea turtles, this means fewer safe places to lay eggs, directly impacting the survival of future generations.' }
        ]
      },
      {
        round: 4,
        title: 'Ocean Recovery?',
        narrative: 'Humans are establishing a "Marine Protected Area". Fishing is banned and trash is being removed.',
        choices: [
          { text: 'Return to the protected reef', impact: { health: 20, pop: 1, bio: 2 }, consequence: 'Life slowly begins to return to the vibrant reef.', rippleEffect: 'Protected areas allow ecosystems to rebuild resilience.', reflectionQuestion: 'Why are Marine Protected Areas effective?', visual: '🛡️', explanation: 'Marine Protected Areas (MPAs) act as "nurseries" for the ocean. By removing human stressors like fishing and pollution, ecosystems can recover their natural balance and become more resilient to climate change.' },
          { text: 'Get tangled in a "ghost" fishing net', impact: { health: -40, pop: -2, bio: -1 }, consequence: 'Abandoned nets continue to kill long after the fishermen are gone.', rippleEffect: "Ghost fishing is a hidden killer in our oceans.", reflectionQuestion: "What should be done with old fishing gear?", visual: '🕸️', explanation: '"Ghost nets" are abandoned or lost fishing gear that continues to trap and kill marine life indefinitely. This is a major source of mortality for sea turtles and other large marine animals.' },
          { text: 'Swim through a shipping lane', impact: { health: -15, pop: -1, bio: 0 }, consequence: 'The noise is deafening and boat strikes are a constant threat.', rippleEffect: 'Industrial noise interferes with marine communication.', reflectionQuestion: 'How does sound pollution affect the ocean?', visual: '🚢', explanation: 'Shipping lanes introduce both physical danger from boat strikes and "noise pollution." Loud underwater noise can disorient marine animals that rely on sound for navigation and communication.' }
        ]
      }
    ]
  },
  bear: {
    id: 'bear',
    name: 'Polar Bear',
    icon: '🐻‍❄️',
    ecosystem: 'Arctic Tundra & Ice',
    description: 'King of the ice, perfectly adapted for a world that is literally melting away.',
    initialHealth: 90,
    initialPop: 4, // Stable/Declining
    initialBio: 4,
    scenarios: [
      {
        round: 1,
        title: 'The Frozen Frontier',
        narrative: 'The sea ice is thick and vast. You wait patiently by a breathing hole for a seal.',
        choices: [
          { text: 'Hunt a seal on the ice', impact: { health: 10, pop: 0, bio: 0 }, consequence: 'A successful hunt! You gain fat for the coming months.', rippleEffect: 'Predators keep prey populations healthy and strong.', reflectionQuestion: 'Why is sea ice essential for polar bear hunting?', visual: '❄️', explanation: 'Polar bears are specialized hunters that rely on sea ice as a platform to reach their primary prey, seals. Without ice, bears cannot hunt effectively and must rely on their fat reserves.' },
          { text: 'Teach your cubs how to swim', impact: { health: 0, pop: 1, bio: 0 }, consequence: 'The cubs are learning vital survival skills.', rippleEffect: 'Stronger offspring ensure the survival of the species.', reflectionQuestion: 'How do parental behaviors affect population survival?', visual: '🐾', explanation: 'Parental care is crucial for species with slow reproductive rates. Teaching cubs to swim and hunt ensures they can navigate the changing Arctic landscape as they grow.' },
          { text: 'Roam the tundra for berries', impact: { health: -5, pop: 0, bio: 0 }, consequence: 'Berries aren\'t as filling as seals, but it\'s a start.', rippleEffect: 'Diverse diets help animals during lean seasons.', reflectionQuestion: 'Can a predator survive on plants alone?', visual: '🫐', explanation: 'While polar bears are primarily carnivores, they are opportunistic. Eating berries provides some energy when ice is absent, but it is not enough to sustain their massive bodies long-term.' }
        ]
      },
      {
        round: 2,
        title: 'The Early Melt',
        narrative: 'The ice is melting earlier each year. The platforms you use to hunt are drifting away.',
        choices: [
          { text: 'Swim long distances to find stable ice', impact: { health: -30, pop: -1, bio: 0 }, consequence: 'You are exhausted. Swimming in open water is dangerous for cubs.', rippleEffect: 'Loss of sea ice leads to increased energy expenditure and drowning.', reflectionQuestion: 'Why does a warming climate mean less ice in the Arctic?', visual: '🏊', explanation: 'As the Arctic warms twice as fast as the rest of the planet, sea ice melts sooner and freezes later. This forces bears to swim hundreds of miles, which can lead to exhaustion and drowning, especially for young cubs.' },
          { text: 'Wait on the shore for the ice to return', impact: { health: -20, pop: -1, bio: 0 }, consequence: 'You go months without a proper meal, losing weight fast.', rippleEffect: 'Forced fasting periods are becoming too long for bears to survive.', reflectionQuestion: 'What happens to a body when it can\'t find food for months?', visual: '⏳', explanation: 'When bears are stuck on land during the ice-free season, they enter a state of "walking hibernation." However, if the ice-free period lasts too long, they run out of fat reserves and begin to starve.' },
          { text: 'Scavenge for bird eggs on the cliffs', impact: { health: -5, pop: 0, bio: -2 }, consequence: 'You find food, but the bird population suffers immensely.', rippleEffect: 'Changing predator diets can cause collapse in other species.', reflectionQuestion: 'How does one species\' loss affect another?', visual: '🪺', explanation: 'When a top predator like the polar bear is forced to change its diet, it can cause a "trophic cascade." Eating bird eggs can lead to the collapse of local bird colonies that aren\'t adapted to bear predation.' }
        ]
      },
      {
        round: 3,
        title: 'Human Neighbors',
        narrative: 'Hunger drives you toward a small Arctic town. The smell of trash is enticing.',
        choices: [
          { text: 'Raid the town\'s garbage bins', impact: { health: -10, pop: -1, bio: 0 }, consequence: 'You get food, but you are chased away with loud noises and flares.', rippleEffect: 'Human-wildlife conflict often ends poorly for the animals.', reflectionQuestion: 'Why do wild animals approach human settlements?', visual: '🗑️', explanation: 'As natural food sources disappear, animals are drawn to human settlements by the smell of food. This leads to "human-wildlife conflict," which is dangerous for both people and animals.' },
          { text: 'Keep your distance and stay wild', impact: { health: -20, pop: -1, bio: 0 }, consequence: 'You remain safe from humans, but you are starving.', rippleEffect: 'Remaining in natural habitats is safer but harder in a changing world.', reflectionQuestion: 'What is "habituation" in wildlife?', visual: '🏔️', explanation: 'Staying away from humans prevents "habituation"—where animals lose their natural fear. While safer from conflict, it is increasingly difficult for bears to find enough natural food on land.' },
          { text: 'Cross an oil pipeline path', impact: { health: -10, pop: 0, bio: -1 }, consequence: 'The ground is stained with oil. It hurts your paws.', rippleEffect: 'Industrial development disrupts migration and pollutes the land.', reflectionQuestion: 'How does oil drilling affect the Arctic?', visual: '🛢️', explanation: 'Industrial development in the Arctic, like oil drilling and pipelines, fragments the habitat and introduces the risk of toxic spills. These activities can disrupt migration routes and pollute the fragile tundra.' }
        ]
      },
      {
        round: 4,
        title: 'The Future of the Ice',
        narrative: 'The world is discussing carbon emissions. Some changes are happening, but the ice is still thin.',
        choices: [
          { text: 'Benefit from new conservation laws', impact: { health: 15, pop: 1, bio: 1 }, consequence: 'Protected areas and reduced hunting help your population stabilize.', rippleEffect: 'Laws can protect species even when their habitat is changing.', reflectionQuestion: 'Can laws save an animal if its home melts?', visual: '⚖️', explanation: 'International agreements to reduce greenhouse gas emissions are the only long-term way to save the polar bear\'s habitat. Conservation laws can help manage populations, but the climate is the ultimate factor.' },
          { text: 'Face a major oil spill', impact: { health: -50, pop: -2, bio: -2 }, consequence: 'The oil ruins your fur\'s insulation. You cannot stay warm.', rippleEffect: 'Pollution in the Arctic is extremely difficult to clean up.', reflectionQuestion: 'Why is oil particularly dangerous for fur-bearing animals?', visual: '☣️', explanation: 'Oil is devastating for polar bears because it ruins the insulating properties of their fur. Without this insulation, bears can die of hypothermia even in the cold Arctic water.' },
          { text: 'Join a research study', impact: { health: 0, pop: 0, bio: 1 }, consequence: 'Scientists track you to understand how to save your species.', rippleEffect: 'Data collection helps humans make better conservation decisions.', reflectionQuestion: 'How does science help in saving ecosystems?', visual: '📊', explanation: 'Scientific research provides the data needed to create effective conservation plans. By tracking bear movements and health, scientists can identify the most critical areas to protect.' }
        ]
      }
    ]
  },
  bee: {
    id: 'bee',
    name: 'Honey Bee',
    icon: '🐝',
    ecosystem: 'Meadows & Grasslands',
    description: 'A tiny but mighty worker. Without you, the world\'s food supply would crumble.',
    initialHealth: 90,
    initialPop: 5,
    initialBio: 5,
    scenarios: [
      {
        round: 1,
        title: 'The Great Meadow',
        narrative: 'A field of wildflowers stretches to the horizon. The sun is warm, and the hive is humming.',
        choices: [
          { text: 'Collect nectar from diverse wildflowers', impact: { health: 10, pop: 0, bio: 0 }, consequence: 'The hive produces rich, healthy honey.', rippleEffect: 'Pollination allows plants to reproduce and create seeds.', reflectionQuestion: 'Why is pollination important for plants?', visual: '🌸', explanation: 'Bees are "keystone species." By collecting nectar, they transfer pollen between flowers, which is necessary for 75% of the world\'s food crops to reproduce and grow fruit.' },
          { text: 'Scout for new nesting sites', impact: { health: 0, pop: 1, bio: 0 }, consequence: 'A new colony is established in a hollow tree.', rippleEffect: 'Expansion of hives increases the reach of pollination services.', reflectionQuestion: 'How do bees benefit the whole ecosystem?', visual: '🌳', explanation: 'Bees live in complex social colonies. Establishing new hives ensures that pollination services are spread across a wider area, supporting the growth of diverse plant life in the meadow.' },
          { text: 'Defend the hive from a wasp', impact: { health: -5, pop: 0, bio: 0 }, consequence: 'The hive is safe, but several workers are lost.', rippleEffect: 'Natural predator-prey balance is maintained.', reflectionQuestion: 'Is predation always bad for a population?', visual: '⚔️', explanation: 'Predation is a natural part of any ecosystem. While individual bees are lost, the hive as a whole survives, and the predator (the wasp) also gets the energy it needs to survive.' }
        ]
      },
      {
        round: 2,
        title: 'The Monoculture',
        narrative: 'The wildflowers are gone, replaced by a massive field of only one type of crop: corn.',
        choices: [
          { text: 'Try to survive on just corn pollen', impact: { health: -20, pop: -1, bio: -2 }, consequence: 'Lack of variety makes the bees weak and prone to disease.', rippleEffect: 'Monocultures reduce biodiversity and ecosystem resilience.', reflectionQuestion: 'Why is a "diet" of only one plant bad for bees?', visual: '🌽', explanation: 'A "monoculture" is a large area where only one crop is grown. For bees, this is like eating only one type of food forever—it leads to nutritional deficiencies and weakens their immune systems.' },
          { text: 'Fly long distances to find a garden', impact: { health: -15, pop: -1, bio: 0 }, consequence: 'Many bees get lost or die of exhaustion before returning.', rippleEffect: 'Habitat loss forces species to travel dangerous distances.', reflectionQuestion: 'What are "pollinator corridors"?', visual: '✈️', explanation: 'Habitat fragmentation forces bees to fly much further for food. This "foraging cost" uses up vital energy and increases the risk of bees getting lost or dying before they can return to the hive.' },
          { text: 'The field is sprayed with pesticides', impact: { health: -40, pop: -2, bio: -1 }, consequence: 'Bees become disoriented and die. The hive is silent.', rippleEffect: 'Chemicals intended for pests often kill beneficial insects.', reflectionQuestion: 'How do pesticides affect non-target species?', visual: '🧪', explanation: 'Pesticides, especially neonicotinoids, can be toxic to bees. Even at low doses, they can interfere with a bee\'s ability to navigate, find food, and communicate with the rest of the hive.' }
        ]
      },
      {
        round: 3,
        title: 'The Urban Hive',
        narrative: 'Humans have built a city here. There are small gardens, but also smoke and strange lights.',
        choices: [
          { text: 'Nectar-hunt in a city park', impact: { health: 5, pop: 0, bio: 1 }, consequence: 'You find some flowers, but also sugar water from humans.', rippleEffect: 'Urban green spaces can provide "islands" for wildlife.', reflectionQuestion: 'How can cities be made more bird and bee friendly?', visual: '🏙️', explanation: 'Cities can act as "refuges" for pollinators if they have enough green space. Parks and rooftop gardens provide vital "islands" of habitat in an otherwise concrete landscape.' },
          { text: 'Get confused by night lights', impact: { health: -10, pop: -1, bio: 0 }, consequence: 'Light pollution disrupts your internal navigation.', rippleEffect: 'Artificial light interferes with the natural cycles of many species.', reflectionQuestion: 'What is light pollution?', visual: '💡', explanation: 'Many insects use the sun or moon for navigation. Artificial night lights can disorient them, causing them to fly in circles until they die of exhaustion—a phenomenon known as light pollution.' },
          { text: 'Nest in a building wall', impact: { health: 0, pop: 0, bio: -1 }, consequence: 'You are safe, but humans might call an exterminator.', rippleEffect: 'Coexistence requires human understanding and tolerance.', reflectionQuestion: 'Why do humans often fear beneficial insects?', visual: '🧱', explanation: 'Urban bees often nest in human structures. While they are usually harmless, human fear often leads to the use of exterminators, which further reduces pollinator populations.' }
        ]
      },
      {
        round: 4,
        title: 'A Sustainable Shift?',
        narrative: 'People are planting "Pollinator Gardens" and banning harmful chemicals.',
        choices: [
          { text: 'Thrive in an organic community garden', impact: { health: 25, pop: 2, bio: 2 }, consequence: 'The colony grows rapidly. The gardens are full of fruit.', rippleEffect: 'Removing toxins and providing habitat leads to rapid recovery.', reflectionQuestion: 'What can you plant at home to help bees?', visual: '🌻', explanation: 'Organic gardening avoids synthetic chemicals and focuses on native plants. This provides a safe, nutrient-rich environment where bee colonies can thrive and support local food production.' },
          { text: 'Succumb to Colony Collapse Disorder', impact: { health: -50, pop: -3, bio: -2 }, consequence: 'The stressors of pollution and disease are too much.', rippleEffect: 'The loss of bees would lead to a global food crisis.', reflectionQuestion: 'What would happen to our food if bees went extinct?', visual: '🥀', explanation: 'Colony Collapse Disorder (CCD) is a phenomenon where the majority of worker bees disappear. It is likely caused by a combination of pesticides, habitat loss, and pathogens.' },
          { text: 'Compete with a new invasive bee species', impact: { health: -10, pop: -1, bio: -1 }, consequence: 'Resources are scarce as you fight for the same flowers.', rippleEffect: 'Introduced species can outcompete native ones for survival.', reflectionQuestion: 'Why is it better to have native species?', visual: '🐝', explanation: 'Invasive species can outcompete native bees for nectar and nesting sites. This can reduce the overall biodiversity of the area and disrupt the relationships between native plants and their pollinators.' }
        ]
      }
    ]
  }
};
