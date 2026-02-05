
import { TeamConfig, Resource } from './types';
import { BookOpen, Users, Clock, Gavel, Package, Star } from 'lucide-react';

export const TEAMS: Record<string, TeamConfig> = {
  red: { id: 'red', name: 'Rood', hex: '#e73546', textColor: 'text-white' },
  green: { id: 'green', name: 'Groen', hex: '#63b986', textColor: 'text-white' },
  yellow: { id: 'yellow', name: 'Geel', hex: '#e4e022', textColor: 'text-black' },
  orange: { id: 'orange', name: 'Oranje', hex: '#f28b39', textColor: 'text-white' },
};

export const RESOURCE_CONFIG: Record<Resource, { label: string; color: string; icon: any }> = {
  kennis: { label: 'Kennis', color: 'bg-res-kennis', icon: BookOpen },
  samenwerking: { label: 'Samenwerking', color: 'bg-res-samenwerking', icon: Users },
  tijd: { label: 'Tijd', color: 'bg-res-tijd', icon: Clock },
  besluitkracht: { label: 'Besluitkracht', color: 'bg-res-besluitkracht', icon: Gavel },
  materiaal: { label: 'Materiaal', color: 'bg-res-materiaal', icon: Package },
  keuze: { label: 'Kaart naar keuze', color: 'bg-yellow-500', icon: Star },
};

export const BUILDING_COSTS: Record<string, Array<{ resource: Resource; amount: number }>> = {
  route: [
    { resource: 'samenwerking', amount: 1 },
    { resource: 'tijd', amount: 1 },
    { resource: 'kennis', amount: 1 }
  ],
  door: [
    { resource: 'materiaal', amount: 1 },
    { resource: 'kennis', amount: 1 },
    { resource: 'samenwerking', amount: 1 }
  ],
  brandblusser: [
    { resource: 'samenwerking', amount: 1 },
    { resource: 'tijd', amount: 1 },
    { resource: 'materiaal', amount: 1 },
    { resource: 'besluitkracht', amount: 1 }
  ]
};

export const INCIDENT_REWARDS: Resource[] = ['samenwerking', 'kennis'];

export const CHALLENGE_INCIDENTS = [
  {
    id: 1,
    title: "Plotselinge instorting in de kantoortuin",
    scenario: "Een collega zakt tijdens het koffiehalen plotseling in elkaar. Hij reageert niet op aanspreken of schudden.",
    q1: {
      question: "Wat is je eerste actie nadat je hebt vastgesteld dat het slachtoffer bewusteloos is?",
      options: ["Direct beginnen met 30 borstcompressies", "De luchtweg vrijmaken en 10 seconden de ademhaling controleren", "De AED ophalen en de elektroden direct op de kleding plakken"],
      correctAnswer: "De luchtweg vrijmaken en 10 seconden de ademhaling controleren"
    },
    q2: {
      question: "Je stelt vast dat er geen ademhaling is. Wat zeg je tegen de persoon die de AED gaat halen?",
      options: ["Haal de AED en activeer hem pas als ik moe word", "Haal de AED, zet hem aan en volg de gesproken instructies direct op", "Haal de AED en wacht met aansluiten tot de ambulance er is"],
      correctAnswer: "Haal de AED, zet hem aan en volg de gesproken instructies direct op"
    }
  },
  {
    id: 2,
    title: "Gevallen fietser op het parkeerterrein",
    scenario: "Een collega is van zijn fiets gevallen op het natte terrein. Hij ligt op zijn buik en reageert niet.",
    q1: {
      question: "Je wilt de ademhaling controleren, maar hij ligt op zijn buik. Wat doe je?",
      options: ["Ademhaling controleren op de rug", "Het slachtoffer van buik naar rug draaien om de ademhaling te beoordelen", "Laten liggen en wachten op hulpdiensten om nekletsel te voorkomen"],
      correctAnswer: "Het slachtoffer van buik naar rug draaien om de ademhaling te beoordelen"
    },
    q2: {
      question: "Het slachtoffer ademt normaal maar blijft bewusteloos. Wat is de juiste vervolgstap?",
      options: ["Laten liggen op de rug en warm toedekken", "Het slachtoffer in de stabiele zijligging leggen", "Direct beginnen met reanimatie voor de zekerheid"],
      correctAnswer: "Het slachtoffer in de stabiele zijligging leggen"
    }
  },
  {
    id: 3,
    title: "Verwardheid bij de lunch",
    scenario: "Een collega met diabetes wordt plotseling erg zweterig, trillerig en begint wartaal uit te slaan.",
    q1: {
      question: "Waar duiden deze symptomen waarschijnlijk op?",
      options: ["Hyperglykemie (te hoge bloedsuiker)", "Hypoglykemie (te lage bloedsuiker)", "Beginnend hartinfarct"],
      correctAnswer: "Hypoglykemie (te lage bloedsuiker)"
    },
    q2: {
      question: "Welke eerste hulp verleen je direct?",
      options: ["Laten liggen en een glas water geven", "Direct extra insuline toedienen", "Suikerhoudende drank of druivensuiker tabletten geven"],
      correctAnswer: "Suikerhoudende drank of druivensuiker tabletten geven"
    }
  },
  {
    id: 4,
    title: "Ongeval in het magazijn",
    scenario: "Een zware doos is op het onderbeen van een medewerker gevallen. Er is een standsafwijking zichtbaar.",
    q1: {
      question: "Welke combinatie van letsels vermoed je hier?",
      options: ["Kneuzing en hartklachten", "Botbreuk en beginnende shock", "Verstuiking en flauwte"],
      correctAnswer: "Botbreuk en beginnende shock"
    },
    q2: {
      question: "Hoe behandel je het been van dit slachtoffer?",
      options: ["Het been proberen recht te zetten", "Immobiliseren in de positie waarin je het aantreft", "Laten rondlopen voor de doorbloeding"],
      correctAnswer: "Immobiliseren in de positie waarin je het aantreft"
    }
  },
  {
    id: 5,
    title: "Brandmelding technische ruimte",
    scenario: "Het brandalarm gaat af. Er komt rook onder de deur van de technische ruimte vandaan.",
    q1: {
      question: "Wat is de functie van een nevenindicator bij de deur?",
      options: ["Geeft aan hoeveel mensen er binnen zijn", "Gaat branden als er in die ruimte een brandmelder is afgegaan", "Meet de temperatuur in de ruimte"],
      correctAnswer: "Gaat branden als er in die ruimte een brandmelder is afgegaan"
    },
    q2: {
      question: "Je ziet rook. Wat is de veiligste actie?",
      options: ["Deur openen om te kijken hoe groot de brand is", "Deur gesloten houden, brandweer informeren en ontruiming starten", "Met een natte doek naar binnen gaan om te blussen"],
      correctAnswer: "Deur gesloten houden, brandweer informeren en ontruiming starten"
    }
  },
  {
    id: 6,
    title: "Splinter in het oog",
    scenario: "Een medewerker krijgt een metalen splinter in zijn oog en begint hard te wrijven.",
    q1: {
      question: "Wat is je eerste instructie aan het slachtoffer?",
      options: ["Blijf goed wrijven", "Stop direct met wrijven in het oog", "Spoelen met een harde straal kraanwater"],
      correctAnswer: "Stop direct met wrijven in het oog"
    },
    q2: {
      question: "Hoe verleen je verder hulp bij een vastzittend voorwerp in het oog?",
      options: ["Splinter verwijderen met een pincet", "Beide ogen afdekken en verwijzen naar een arts", "Heel hard laten knipperen"],
      correctAnswer: "Beide ogen afdekken en verwijzen naar een arts"
    }
  },
  {
    id: 7,
    title: "Pijn op de borst",
    scenario: "Een bezoeker krijgt drukkende pijn op de borst, uitstralend naar de kaken. Hij ziet lijkbleek.",
    q1: {
      question: "Wat is de beste houding voor dit slachtoffer?",
      options: ["Plat op de rug met benen omhoog", "Stabiele zijligging", "Halfzittende houding met steun in de rug"],
      correctAnswer: "Halfzittende houding met steun in de rug"
    },
    q2: {
      question: "De pijn trekt na 15 minuten niet weg. Waar moet je rekening mee houden?",
      options: ["Onschuldige hyperventilatie", "Dit kan wijzen op een hartinfarct; bel 112", "Typische hypo bij diabetes"],
      correctAnswer: "Dit kan wijzen op een hartinfarct; bel 112"
    }
  },
  {
    id: 8,
    title: "Diepe snijwond met glas",
    scenario: "Een schoonmaker snijdt zich diep aan een kapotte vaas. Er zit nog glas in de wond.",
    q1: {
      question: "Hoe handel je met betrekking tot het stuk glas in de wond?",
      options: ["Glas direct verwijderen", "Glas laten zitten en stabiliseren met verband", "Hard op het glas drukken om bloeden te stoppen"],
      correctAnswer: "Glas laten zitten en stabiliseren met verband"
    },
    q2: {
      question: "Hoe dek je deze wond af?",
      options: ["Kleine pleister opplakken", "Wond rondom opvullen met gazen en drukverband aanleggen (niet op glas drukken)", "Spoelen met desinfectiemiddel terwijl glas erin zit"],
      correctAnswer: "Wond rondom opvullen met gazen en drukverband aanleggen (niet op glas drukken)"
    }
  },
  {
    id: 9,
    title: "Chemische spatten",
    scenario: "In het lab spat er een bijtende vloeistof in het gezicht en oog van een laborant.",
    q1: {
      question: "Hoe lang moet je het oog minimaal spoelen?",
      options: ["Maximaal 2 minuten", "Minimaal 15 tot 20 minuten met lauw water", "Tot de pijn weg is"],
      correctAnswer: "Minimaal 15 tot 20 minuten met lauw water"
    },
    q2: {
      question: "In welke richting spoel je het oog om het andere oog te beschermen?",
      options: ["Van de neus af, naar de buitenkant", "Van de buitenkant naar de neus toe", "Maakt niet uit"],
      correctAnswer: "Van de neus af, naar de buitenkant"
    }
  },
  {
    id: 10,
    title: "Val van een keukentrapje",
    scenario: "Iemand valt en landt ongelukkig op zijn pols. Deze wordt snel dik en blauw.",
    q1: {
      question: "Welke regel pas je toe bij vermoeden van verstuiking?",
      options: ["ABC-regel", "ICE-regel (Immobiliseren, Koelen, Elevatie)", "30:2-regel"],
      correctAnswer: "ICE-regel (Immobiliseren, Koelen, Elevatie)"
    },
    q2: {
      question: "Hoe lang moet je de pols koelen?",
      options: ["Ongeveer 10 tot 20 minuten", "Minimaal een uur onafgebroken", "Alleen de eerste 2 minuten"],
      correctAnswer: "Ongeveer 10 tot 20 minuten"
    }
  },
  {
    id: 11,
    title: "Sprinkleractivatie in de garage",
    scenario: "Er is een kleine autobrand in de parkeergarage. De sprinkler gaat af.",
    q1: {
      question: "Wat zorgt er normaal voor dat een sprinklerkop gaat sproeien?",
      options: ["Detectie van rook", "Hitte die een glazen buisje of smeltzekering doet breken", "Indrukken van handbrandmelder"],
      correctAnswer: "Hitte die een glazen buisje of smeltzekering doet breken"
    },
    q2: {
      question: "Wat is het effect van de sprinkler op de brand?",
      options: ["Blust altijd de volledige brand binnen 10 seconden", "Beheerst de brand en beperkt uitbreiding tot de brandweer er is", "Zorgt dat rook uit het gebouw wordt gezogen"],
      correctAnswer: "Beheerst de brand en beperkt uitbreiding tot de brandweer er is"
    }
  },
  {
    id: 12,
    title: "Schaafwond op knokkel",
    scenario: "Een medewerker heeft een schaafwond op de wijsvinger door het stoten tegen een stelling.",
    q1: {
      question: "Welk hulpmiddel is het meest geschikt voor dit gewricht?",
      options: ["Normale pleister strak eromheen", "Pleisterkaart met inkepingen voor beweging", "Steriel gaas met schilderstape"],
      correctAnswer: "Pleisterkaart met inkepingen voor beweging"
    },
    q2: {
      question: "Waarom is het belangrijk om de wond eerst te reinigen?",
      options: ["Zodat de pleister niet loslaat", "Om infecties te voorkomen", "Om de kleur beter te kunnen zien"],
      correctAnswer: "Om infecties te voorkomen"
    }
  },
  {
    id: 13,
    title: "Ernstige bloeding en shock",
    scenario: "Een collega heeft een slagaderlijke bloeding aan zijn bovenarm. Hij wordt suf.",
    q1: {
      question: "Wat is je prioriteit bij dit slachtoffer?",
      options: ["Geruststellen en deken halen", "Direct de bloeding stelpen door krachtige druk", "Stabiele zijligging"],
      correctAnswer: "Direct de bloeding stelpen door krachtige druk"
    },
    q2: {
      question: "Waarom leg je een slachtoffer met shock plat neer?",
      options: ["Zodat hij niet wegloopt", "Bloedtoevoer naar vitale organen ondersteunen", "Makkelijker drukverband aanleggen"],
      correctAnswer: "Bloedtoevoer naar vitale organen ondersteunen"
    }
  },
  {
    id: 14,
    title: "Rookmelder in de kantine",
    scenario: "In de kantine hangt een rookmelder die afgaat door aangebrand brood.",
    q1: {
      question: "Hoe reageert een optische rookmelder?",
      options: ["Onderbreking van lichtstraal door rookdeeltjes", "Chemische samenstelling van verbrand brood", "Snelle stijging van temperatuur"],
      correctAnswer: "Onderbreking van lichtstraal door rookdeeltjes"
    },
    q2: {
      question: "Wat doe je als BHV'er nadat je vaststelt dat het loos alarm is?",
      options: ["Batterij eruit halen", "Melding verifiëren en centrale herstellen (resetten)", "Ruimte verlaten en brandweer laten komen"],
      correctAnswer: "Melding verifiëren en centrale herstellen (resetten)"
    }
  },
  {
    id: 15,
    title: "Flauwte of meer?",
    scenario: "Iemand wordt onwel op een warme dag, valt flauw maar komt na 30 seconden weer bij.",
    q1: {
      question: "Wat is de eerste hulp bij een 'gewone' flauwte?",
      options: ["Direct 112 bellen", "Even laten liggen, daarna langzaam overeind; frisse lucht", "Dwingen zware maaltijd te eten"],
      correctAnswer: "Even laten liggen, daarna langzaam overeind; frisse lucht"
    },
    q2: {
      question: "Wanneer moet je bij een flauwte alsnog hulp inschakelen?",
      options: ["Als slachtoffer binnen 1 minuut niet bij bewustzijn is", "Altijd", "Alleen als hij dorst heeft"],
      correctAnswer: "Als slachtoffer binnen 1 minuut niet bij bewustzijn is"
    }
  },
  {
    id: 16,
    title: "AED bij nat slachtoffer",
    scenario: "Iemand wordt uit een vijver gehaald. Hij ademt niet. De AED is er.",
    q1: {
      question: "Wat moet je doen voor je de elektroden plakt?",
      options: ["Niets", "Borstkas goed droogwrijven", "Wachten tot hij opgedroogd is in de zon"],
      correctAnswer: "Borstkas goed droogwrijven"
    },
    q2: {
      question: "Mag je een AED gebruiken op een metalen ondergrond?",
      options: ["Nee, levensgevaarlijk", "Ja, mits elektroden metaal niet raken en niemand slachtoffer aanraakt", "Ja, metaal geleidt beter dus is effectiever"],
      correctAnswer: "Ja, mits elektroden metaal niet raken en niemand slachtoffer aanraakt"
    }
  },
  {
    id: 17,
    title: "Verstikking in de kantine",
    scenario: "Een collega verslikt zich, kan niet meer hoesten of praten en grijpt naar zijn keel.",
    q1: {
      question: "Welke handeling voer je als eerste uit?",
      options: ["5 slagen tussen schouderbladen", "Direct buikstoten uitvoeren", "Groot glas water laten drinken"],
      correctAnswer: "5 slagen tussen schouderbladen"
    },
    q2: {
      question: "Wat doe je als slagen tussen de schouderbladen niet helpen?",
      options: ["Slagen nog 20 keer herhalen", "Overgaan op maximaal 5 buikstoten", "Direct beginnen met reanimatie"],
      correctAnswer: "Overgaan op maximaal 5 buikstoten"
    }
  },
  {
    id: 18,
    title: "Handbrandmelder geactiveerd",
    scenario: "Iemand heeft in paniek een handbrandmelder ingedrukt bij de uitgang.",
    q1: {
      question: "Wat is het directe gevolg?",
      options: ["Sprinkler gaat overal aan", "Melding naar BMC en meestal ontruimingssignaal (slow-whoop)", "Stroom wordt overal afgesloten"],
      correctAnswer: "Melding naar BMC en meestal ontruimingssignaal (slow-whoop)"
    },
    q2: {
      question: "Hoe herken je dat een melder is geactiveerd?",
      options: ["Vlaggetje aan onderkant", "Ruitje ingedrukt/gebroken en vaak gekleurd streepje zichtbaar", "Begint hard te roken"],
      correctAnswer: "Ruitje ingedrukt/gebroken en vaak gekleurd streepje zichtbaar"
    }
  },
  {
    id: 19,
    title: "Kneuzing of breuk na val",
    scenario: "Een medewerker valt van een bureau en klaagt over hevige pijn in de enkel. Hij kan er niet op staan.",
    q1: {
      question: "Je twijfelt tussen breuk of verstuiking. Hoe behandel je het?",
      options: ["Als een breuk (immobiliseren en arts)", "Dwingen om te lopen", "Stevige massage geven"],
      correctAnswer: "Als een breuk (immobiliseren en arts)"
    },
    q2: {
      question: "Waarom is 'elevatie' (hoog leggen) belangrijk?",
      options: ["Zodat hij niet wegloopt", "Bloedtoevoer verminderen om zwelling en pijn te beperken", "Makkelijker foto's maken"],
      correctAnswer: "Bloedtoevoer verminderen om zwelling en pijn te beperken"
    }
  },
  {
    id: 20,
    title: "Reanimatie en vermoeidheid",
    scenario: "Je bent alleen aan het reanimeren. Er arriveert een tweede BHV'er.",
    q1: {
      question: "Wanneer is het juiste moment om te wisselen?",
      options: ["Bij uitputting", "Elke 2 minuten (5 cycli van 30:2)", "Nooit"],
      correctAnswer: "Elke 2 minuten (5 cycli van 30:2)"
    },
    q2: {
      question: "De AED zegt: 'Geen schok geadviseerd'. Wat doe je?",
      options: ["Stoppen en wachten op ambulance", "Ademhaling controleren; indien afwezig doorgaan met 30:2", "AED uitzetten en rechtop zetten"],
      correctAnswer: "Ademhaling controleren; indien afwezig doorgaan met 30:2"
    }
  }
];

export const SKILLS = [
  { id: 'ehbo-1', name: 'Eerste Hulp verlenen' },
  { id: 'brand-1', name: 'Brandbestrijding' },
  { id: 'ontruim-1', name: 'Ontruiming begeleiden' },
  { id: 'reanim-1', name: 'Reanimatie (AED)' },
  { id: 'comm-1', name: 'Communicatie' }
];

export const QUESTIONS = [
  { id: 1, question: "Wat is de verhouding tussen borstcompressies en mond-op-mondbeademing?", answer: "30:2" },
  { id: 2, question: "Waar staat de afkorting 'RICE' voor bij letsel?", answer: "Rust, IJs, Compressie, Elevatie" },
  { id: 3, question: "Wat doe je als eerste bij een vlam in de pan?", answer: "Deksel op de pan schuiven" },
  { id: 4, question: "Wat is de minimale leeftijd voor een BHV'er?", answer: "16 jaar" },
  { id: 5, question: "Hoe herken je een beroerte?", answer: "Scheve mond, lamme arm, onduidelijke spraak (FAST)" }
];
