
import { Skill, Question, TeamConfig, Resource, IncidentScenario } from './types';
import { BookOpen, Users, Clock, Gavel, Package, Star } from 'lucide-react';

export const TEAMS: Record<string, TeamConfig> = {
  red: { id: 'red', name: 'Rood', hex: '#e73546', textColor: 'text-white' },
  green: { id: 'green', name: 'Groen', hex: '#63b986', textColor: 'text-white' },
  yellow: { id: 'yellow', name: 'Geel', hex: '#e4e022', textColor: 'text-black' },
  orange: { id: 'orange', name: 'Oranje', hex: '#f28b39', textColor: 'text-white' },
};

export const DOOR_POINTS = 1;

export const MIN_SKILLS_REQUIRED = 5;

// Resource Configuration for UI using requested HEX codes
export const RESOURCE_CONFIG: Record<Resource, { label: string; color: string; icon: any }> = {
  kennis: { label: 'Kennis', color: '#88be43', icon: BookOpen },
  samenwerking: { label: 'Samenwerking', color: '#c89b6c', icon: Users },
  tijd: { label: 'Tijd', color: '#2fb7c2', icon: Clock },
  besluitkracht: { label: 'Besluitkracht', color: '#ae77af', icon: Gavel },
  materiaal: { label: 'Materiaal', color: '#3e67af', icon: Package },
  keuze: { label: 'Kaart naar keuze', color: '#f59e0b', icon: Star },
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
  extinguisher: [
    { resource: 'materiaal', amount: 1 },
    { resource: 'besluitkracht', amount: 1 },
    { resource: 'samenwerking', amount: 1 },
    { resource: 'tijd', amount: 1 }
  ]
};

export const QUESTION_REWARDS: Resource[] = ['kennis', 'keuze'];
export const INCIDENT_REWARDS: Resource[] = ['samenwerking', 'kennis'];
export const EXTINGUISHER_USE_REWARDS: Resource[] = ['samenwerking', 'samenwerking', 'keuze'];

export const SKILLS: Skill[] = [
  { id: 'reanimatie', name: 'Reanimatie', rewards: ['tijd', 'besluitkracht'] },
  { id: 'aed', name: 'AED elektroden plakken', rewards: ['kennis', 'besluitkracht'] },
  { id: 'draaien', name: 'Van buik naar rug draaien', rewards: ['samenwerking', 'tijd'] },
  { id: 'stabiel', name: 'Stabiele zijligging', rewards: ['samenwerking', 'tijd'] },
  { id: 'dekenrol', name: 'Aanleg dekenrol', rewards: ['materiaal', 'samenwerking'] },
  { id: 'steunverband', name: 'Aanleg steunverband', rewards: ['materiaal', 'samenwerking'] },
  { id: 'pleisters', name: 'Pleisters plakken', rewards: ['materiaal', 'tijd'] },
  { id: 'wond', name: 'Wond steriel afdekken', rewards: ['materiaal', 'tijd'] },
];

export const QUESTIONS: Question[] = [
  // Spoedeisende Eerste Hulp
  { id: 1, category: "Spoedeisende Eerste Hulp", question: "Beschrijf de eerste drie stappen die je neemt zodra je een slachtoffer aantreft dat mogelijk gereanimeerd moet worden.", answer: "1. Veiligheid (eigen/omstanders/slachtoffer), 2. Bewustzijn controleren (aanspreken/schudden), 3. Hulp inschakelen/112 (laten) bellen." },
  { id: 2, category: "Spoedeisende Eerste Hulp", question: "Wat is het belangrijkste verschil in de benadering van een bewusteloos slachtoffer met een normale ademhaling versus een slachtoffer zonder normale ademhaling?", answer: "Met ademhaling: Stabiele zijligging. Zonder ademhaling: Direct starten met reanimatie (30:2)." },
  { id: 3, category: "Spoedeisende Eerste Hulp", question: "Hoe diep moet je de borstkas indrukken bij een volwassene tijdens de borstcompressies, en waarom is het volledig omhoog laten komen van de borstkas daarna zo belangrijk?", answer: "Diepte: 5 tot 6 cm. Volledig omhoog komen zorgt ervoor dat het hart zich weer volledig kan vullen met bloed." },
  { id: 4, category: "Spoedeisende Eerste Hulp", question: "Wat zijn de richtlijnen voor het plakken van AED-elektroden als het slachtoffer een volwassene is?", answer: "Eén elektrode rechtsboven op de borstkas (onder sleutelbeen), de andere links aan de zijkant (onder de oksel)." },
  { id: 5, category: "Spoedeisende Eerste Hulp", question: "In welke specifieke situatie kies je ervoor om een slachtoffer in de stabiele zijligging te leggen?", answer: "Bij een bewusteloos slachtoffer dat wél een normale ademhaling heeft." },
  { id: 6, category: "Spoedeisende Eerste Hulp", question: "Hoe controleer je de ademhaling en hoe lang mag deze controle maximaal duren?", answer: "Kijken, luisteren en voelen (Kinlift uitvoeren). Maximaal 10 seconden." },
  { id: 7, category: "Spoedeisende Eerste Hulp", question: "Wat is de functie van de AED in het proces van reanimatie; wat doet het apparaat precies met het hartritme?", answer: "De AED analyseert het hartritme en dient indien nodig een schok toe om een chaotisch ritme (fibrilleren) te stoppen (resetten)." },
  
  // Interne noodsituaties
  { id: 8, category: "Interne noodsituaties", question: "Leg uit wat een 'shock' in medische termen is en waarom dit een levensbedreigende toestand is.", answer: "Een shock is een tekort aan circulerend volume (bloeddrukdaling) waardoor vitale organen te weinig zuurstof krijgen." },
  { id: 9, category: "Interne noodsituaties", question: "Noem drie uiterlijke kenmerken (symptomen) waaraan je kunt herkennen dat een slachtoffer in shock raakt.", answer: "Bleke huid, klam zweet, snelle/zwakke pols, dorst, onrust/verwardheid." },
  { id: 10, category: "Interne noodsituaties", question: "Waarom mag je een slachtoffer in shock nooit iets te drinken geven, ook al klaagt het slachtoffer over dorst?", answer: "Risico op braken en verstikking bij bewustzijnsverlies, en complicaties bij een eventuele latere operatie." },
  { id: 11, category: "Interne noodsituaties", question: "Wat is het belangrijkste verschil in de oorzaak tussen Angina Pectoris en een hartinfarct?", answer: "AP is een tijdelijk zuurstoftekort (vaak door inspanning), een hartinfarct is een volledige afsluiting van een kransslagader (blijvende schade)." },
  { id: 12, category: "Interne noodsituaties", question: "Welke atypische symptomen van een hartinfarct zie je vaker bij vrouwen dan bij mannen?", answer: "Pijn tussen de schouderbladen, misselijkheid, extreme vermoeidheid, kaakpijn, kortademigheid." },
  { id: 13, category: "Interne noodsituaties", question: "Welke eerste hulp verleen je aan een slachtoffer dat pijn op de borst heeft en waarbij je een hartinfarct vermoedt?", answer: "112 bellen, fysieke rust (laten zitten), emotionele rust, kleding losmaken, eventuele medicatie (indien aanwezig) toedienen." },
  { id: 14, category: "Interne noodsituaties", question: "Wat gebeurt er met de bloedsuikerspiegel bij een slachtoffer met een 'hypo' en wat zijn de meest voorkomende symptomen?", answer: "De bloedsuikerspiegel is te laag. Symptomen: Zweten, trillen, honger, veranderd gedrag (snel geïrriteerd)." },
  { id: 15, category: "Interne noodsituaties", question: "Waarom is het protocol bij twijfel tussen een hypo en een hyper om het slachtoffer áltijd suiker aan te bieden?", answer: "Een hypo is op korte termijn veel gevaarlijker voor de hersenen; extra suiker bij een hyper schaadt op dat moment minder dan geen suiker bij een hypo." },
  { id: 16, category: "Interne noodsituaties", question: "Hoe handel je als een diabetespatiënt niet meer aanspreekbaar is of niet meer kan slikken?", answer: "Niets in de mond geven, 112 bellen, slachtoffer in stabiele zijligging leggen." },

  // Botten, gewrichten en oogzorg
  { id: 17, category: "Botten, gewrichten en oogzorg", question: "Wat is het belangrijkste verschil tussen een open en een gesloten botbreuk voor wat betreft de risico’s voor het slachtoffer?", answer: "Een open breuk heeft een infectiegevaar door de wond en vaak risico op groter bloedverlies." },
  { id: 18, category: "Botten, gewrichten en oogzorg", question: "Waarom is het immobiliseren (niet laten bewegen) van een ledemaat essentieel bij het vermoeden van een breuk?", answer: "Om extra schade aan spieren, bloedvaten en zenuwen te voorkomen en pijn te verminderen." },
  { id: 19, category: "Botten, gewrichten en oogzorg", question: "Beschrijf de handelingen bij kneuzingen en verstuikingen.", answer: "Koelen (min 10-15 min), rust geven, eventueel steunverband en het ledemaat hoog leggen (RICE)." },
  { id: 20, category: "Botten, gewrichten en oogzorg", question: "Hoe kun je een verstuiking onderscheiden van een botbreuk?", answer: "Dit is op straat vaak niet mogelijk (alleen via X-ray), maar bij een breuk is er vaak een abnormale stand of onmogelijkheid tot belasten." },
  { id: 21, category: "Botten, gewrichten en oogzorg", question: "Wat moet je absoluut niet doen als er een vuiltje in het oog van een slachtoffer zit, en waarom niet?", answer: "Niet wrijven; dit kan krassen op het hoornvlies veroorzaken." },
  { id: 22, category: "Botten, gewrichten en oogzorg", question: "Beschrijf de juiste procedure voor het spoelen van een oog waar een bijtende vloeistof in is gekomen.", answer: "Direct spoelen met lauw water (min 15 min), van de binnenste naar de buitenste ooghoek, slachtoffer naar ziekenhuis." },
  { id: 23, category: "Botten, gewrichten en oogzorg", question: "Hoe handel wanneer er een splinter of een ander vreemd voorwerp in de oogbol zelf vastzit?", answer: "Niet zelf verwijderen, beide ogen afdekken (om oogbeweging te stoppen) en direct naar een arts/ziekenhuis." },

  // Verdieping wondzorg & verbandleer
  { id: 24, category: "Verdieping wondzorg & verbandleer", question: "Wanneer gebruik je een pleisterkaart en hoe pas je deze toe op een bewegend deel zoals een knokkel of vingertop?", answer: "Bij kleine wonden; door de zijkanten in te knippen vormt de pleister zich beter naar de bewegende gewrichten." },
  { id: 25, category: "Verdieping wondzorg & verbandleer", question: "Waarom mag je een vreemd voorwerp dat diep in een wond zit (zoals een glasstuk of mes) nooit zelf verwijderen?", answer: "Het voorwerp kan een bloedvat afsluiten (tamponade). Verwijderen kan leiden tot een hevige, onstuitbare bloeding." },
  { id: 26, category: "Verdieping wondzorg & verbandleer", question: "Hoe kun je een groot vreemd voorwerp in een wond toch stabiliseren terwijl je de wond afdekt?", answer: "Gebruik een ringkussen of rollen verband aan weerszijden van het voorwerp om het op de plek te houden zonder erop te drukken." },
  { id: 27, category: "Verdieping wondzorg & verbandleer", question: "Wat is de definitie van 'steriel werken' bij het afdekken van een wond en waarom is dit van groot belang?", answer: "De kant van het verband die op de wond niet met de handen aanraken om infecties te voorkomen." },
  { id: 28, category: "Verdieping wondzorg & verbandleer", question: "Hoe ga je creatief te werk met meerdere gazen en een zwachtel bij een zeer grote, actieve bloeding?", answer: "Een wonddrukverband aanleggen: gazen op de wond, dan een hard voorwerp (of rolletje) erop voor druk, en dit stevig vastzetten." },
  { id: 29, category: "Verdieping wondzorg & verbandleer", question: "Op welke signalen let je om te controleren of een aangelegd verband niet te strak zit?", answer: "Kleur (blauw/wit), temperatuur (koud), tintelingen of gevoelloosheid in de vingers of tenen." },
  { id: 30, category: "Verdieping wondzorg & verbandleer", question: "Wat is de functie van een wonddrukverband en in welke situaties pas je dit toe?", answer: "Om een hevige bloeding te stelpen door directe druk op de beschadigde vaten uit te oefenen." },

  // Brandpreventie & gebouwgebonden Voorzieningen
  { id: 31, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Wat is de functie van een nevenindicator in een gebouw en waar vind je deze meestal?", answer: "Een lampje boven een deur dat aangeeft dat de melder in die (afgesloten) ruimte is afgegaan. Vaak in hotels of kantoorpanden." },
  { id: 32, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Hoe activeer je een handbrandmelder en wat gebeurt er direct in de brandmeldcentrale na activatie?", answer: "Ruitje indrukken of knop indrukken. De centrale krijgt een directe melding van de locatie en het ontruimingssignaal start vaak direct." },
  { id: 33, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Leg het verschil uit tussen een optische rookmelder en een thermische melder. In welke ruimtes gebruik je welke melder?", answer: "Optisch reageert op rook (gangen/kantoren). Thermisch op hitte (keukens/garages) om vals alarm door kookdampen te voorkomen." },
  { id: 34, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Hoe treedt een sprinklerinstallatie in werking? Is dit door rook of door hitte?", answer: "Door hitte; het glazen buisje in de sprinklerkop knapt bij een bepaalde temperatuur (vaak 68°C), waardoor het water vrijkomt." },
  { id: 35, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Waarom is het blokkeren van nooddeuren of het openzetten van brandwerende deuren met een kegje verboden?", answer: "Het belemmert de vluchtweg of zorgt ervoor dat vuur en rook zich razendsnel door het hele gebouw kunnen verspreiden." },
  { id: 36, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Wat is het doel van brandcompartimentering in een gebouw?", answer: "De brand en rook gedurende een bepaalde tijd (bijv. 30 of 60 min) beperken tot een klein deel van het gebouw." },
  { id: 37, category: "Brandpreventie & gebouwgebonden Voorzieningen", question: "Welke controlewerkzaamheden kan een BHV'er dagelijks of wekelijks uitvoeren met betrekking tot de gebouwgebonden veiligheidsvoorzieningen?", answer: "Controleren of vluchtwegen vrij zijn, brandblussers verzegeld/aanwezig zijn en of noodverlichting brandt." },
];

export const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: 1,
    title: "Plotselinge instorting in de kantoortuin",
    scenario: "Een collega zakt tijdens het koffiehalen plotseling in elkaar. Hij reageert niet op aanspreken of schudden aan de schouders.",
    questions: [
      {
        question: "Wat is je eerste actie nadat je hebt vastgesteld dat het slachtoffer niet bewusteloos is?",
        options: ["A) Direct beginnen met 30 borstcompressies.", "B) De luchtweg vrijmaken en 10 seconden de ademhaling controleren.", "C) De AED ophalen en de elektroden direct op de kleding plakken."],
        answer: "B"
      },
      {
        question: "Je stelt vast dat er geen ademhaling is en laat 112 bellen. Wat zeg je tegen de persoon die de AED gaat halen?",
        options: ["A) \"Haal de AED en activeer hem pas als ik moe word.\"", "B) \"Haal de AED, zet hem aan en volg de gesproken instructies direct op.\"", "C) \"Haal de AED en wacht met aansluiten tot de ambulance er is.\""],
        answer: "B"
      }
    ]
  },
  {
    id: 2,
    title: "Gevallen fietser op het parkeerterrein",
    scenario: "Op het natte parkeerterrein tref je een collega aan die van zijn fiets is gevallen. Hij ligt op zijn buik en reageert niet.",
    questions: [
      {
        question: "Je wilt de ademhaling controleren, maar het slachtoffer ligt op zijn buik. Wat doe je?",
        options: ["A) Je controleert de ademhaling terwijl hij op zijn buik ligt door je hand op zijn rug te leggen.", "B) Je draait het slachtoffer volgens de methode 'draaien van buik naar rug' om de ademhaling goed te kunnen beoordelen.", "C) Je laat hem liggen en wacht op de professionele hulpdiensten om nekletsel te voorkomen."],
        answer: "B"
      },
      {
        question: "Het slachtoffer ademt normaal maar blijft bewusteloos. Wat is de juiste vervolgstap?",
        options: ["A) Je laat hem op zijn rug liggen en dekt hem warm toe.", "B) Je legt het slachtoffer in de stabiele zijligging.", "C) Je begint direct met reanimatie voor de zekerheid."],
        answer: "B"
      }
    ]
  },
  {
    id: 3,
    title: "Verwardheid bij de lunch",
    scenario: "Tijdens de lunch wordt een collega met diabetes plotseling erg zweterig, trillerig en begint wartaal uit te slaan. Ze is nog wel aanspreekbaar.",
    questions: [
      {
        question: "Waar duiden deze symptomen waarschijnlijk op?",
        options: ["A) Een hyperglykemie (te hoge bloedsuiker).", "B) Een hypoglykemie (te lage bloedsuiker).", "C) Een beginnend hartinfarct."],
        answer: "B"
      },
      {
        question: "Welke eerste hulp verleen je direct?",
        options: ["A) Je laat haar rustig liggen en geeft haar een glas water.", "B) Je dient haar direct extra insuline toe.", "C) Je geeft haar suikerhoudende drank of druivensuiker tabletten."],
        answer: "C"
      }
    ]
  },
  {
    id: 4,
    title: "Ongeval in het magazijn",
    scenario: "In het magazijn is een zware doos op het onderbeen van een medewerker gevallen. Er is een duidelijke standsafwijking te zien en het slachtoffer is bleek en klam.",
    questions: [
      {
        question: "Welke combinatie van letsels vermoed je hier?",
        options: ["A) Een kneuzing en hartklachten.", "B) Een botbreuk en een beginnende shock.", "C) Een verstuiking en flauwte."],
        answer: "B"
      },
      {
        question: "Hoe behandel je het been van dit slachtoffer?",
        options: ["A) Je probeert het been recht te zetten om de pijn te verlichten.", "B) Je immobiliseert het been in de positie waarin je het aantreft.", "C) Je laat het slachtoffer rondlopen om de doorbloeding te stimuleren."],
        answer: "B"
      }
    ]
  },
  {
    id: 5,
    title: "Brandmelding in de technische ruimte",
    scenario: "Het brandalarm gaat af. Op het nevenpaneel van de brandmeldcentrale (BMC) zie je dat er een melding komt uit de technische ruimte op de tweede verdieping.",
    questions: [
      {
        question: "Wat is de functie van een nevenindicator bij de deur van de technische ruimte?",
        options: ["A) Deze geeft aan hoeveel mensen er nog in de ruimte zijn.", "B) Deze gaat branden als er in die afgesloten ruimte een brandmelder is afgegaan.", "C) Deze indicator meet de temperatuur in de ruimte."],
        answer: "B"
      },
      {
        question: "Je ziet rook onder de deur vandaan komen. Wat is de veiligste actie?",
        options: ["A) De deur openen om te zien hoe groot de brand is.", "B) De deur gesloten houden, de brandweer informeren en de ontruiming starten.", "C) Met een natte doek voor je mond naar binnen gaan om te blussen."],
        answer: "B"
      }
    ]
  },
  {
    id: 6,
    title: "Splinter in het oog",
    scenario: "Tijdens het klussen krijgt een medewerker een metalen splinter in zijn oog. Hij wrijft hard in zijn oog.",
    questions: [
      {
        question: "Wat is je eerste instructie aan het slachtoffer?",
        options: ["A) \"Blijf goed wrijven, dan komt de splinter er vanzelf uit.\"", "B) \"Stop direct met wrijven in het oog.\"", "C) \"Spoel het oog direct met kraanwater onder een harde straal.\""],
        answer: "B"
      },
      {
        question: "Hoe verleen je verder eerste hulp bij een vastzittend vreemd voorwerp in het oog?",
        options: ["A) Je probeert de splinter voorzichtig te verwijderen met een pincet.", "B) Je dekt beide ogen af met een steriel verband of oogdop en verwijst naar een arts.", "C) Je vraagt het slachtoffer om heel hard te knipperen."],
        answer: "B"
      }
    ]
  },
  {
    id: 7,
    title: "Pijn op de borst tijdens een vergadering",
    scenario: "Een oudere bezoeker krijgt tijdens een vergadering plotseling een drukkende pijn op de borst, uitstralend naar de kaken. Hij ziet lijkbleek.",
    questions: [
      {
        question: "Wat is de beste houding voor dit slachtoffer?",
        options: ["A) Plat op de rug met de benen omhoog.", "B) In de stabiele zijligging.", "C) Halfzittende houding met steun in de rug."],
        answer: "C"
      },
      {
        question: "De pijn trekt na 15 minuten rust niet weg. Waar moet je rekening mee houden?",
        options: ["A) Dit is waarschijnlijk een onschuldige hyperventilatie.", "B) Dit kan wijzen op een hartinfarct; bel direct 112.", "C) Dit is een typische hypo bij diabetes."],
        answer: "B"
      }
    ]
  },
  {
    id: 8,
    title: "Een diepe snijwond met glas",
    scenario: "Een schoonmaker snijdt zich diep aan een kapotte glazen vaas. Er zit nog een groot stuk glas in de wond, die flink bloedt.",
    questions: [
      {
        question: "Hoe handel je met betrekking tot het stuk glas in de wond?",
        options: ["A) Je verwijdert het glas direct om de wond goed te kunnen reinigen.", "B) Je laat het glas zitten en probeert het te stabiliseren met verbandmateriaal.", "C) Je drukt hard op het glas om het bloeden te stoppen."],
        answer: "B"
      },
      {
        question: "Hoe dek je deze wond af als je meerdere gazen nodig hebt?",
        options: ["A) Je plakt er één kleine pleister op en drukt die goed aan.", "B) Je gebruikt steriele gazen om de wond rondom het voorwerp op te vullen en legt een drukverband aan zonder op het glas te duwen.", "C) Je spoelt de wond eerst uitgebreid met desinfectiemiddel terwijl het glas er nog in zit."],
        answer: "B"
      }
    ]
  },
  {
    id: 9,
    title: "Chemische spatten",
    scenario: "In het laboratorium spat er een bijtende vloeistof in het gezicht en het oog van een laborant.",
    questions: [
      {
        question: "Hoe lang moet je het oog minimaal spoelen bij chemisch letsel?",
        options: ["A) Maximaal 2 minuten.", "B) Minimaal 15 tot 20 minuten met lauw stromend water.", "C) Alleen tot het slachtoffer zegt dat de pijn weg is."],
        answer: "B"
      },
      {
        question: "In welke richting spoel je het oog om het andere oog te beschermen?",
        options: ["A) Van de neus af, naar de buitenkant van het gezicht.", "B) Van de buitenkant naar de neus toe.", "C) Dat maakt niet uit, zolang er maar veel water wordt gebruikt."],
        answer: "A"
      }
    ]
  },
  {
    id: 10,
    title: "Val van een keukentrapje",
    scenario: "Iemand valt van een trapje en landt ongelukkig op zijn pols. De pols wordt snel dik en blauw, maar staat niet in een vreemde stand.",
    questions: [
      {
        question: "Welke regel pas je toe bij dit vermoeden van een verstuiking?",
        options: ["A) De ABC-regel.", "B) De ICE-regel (Immobiliseren, Koelen, Elevatie).", "C) De 30:2-regel."],
        answer: "B"
      },
      {
        question: "Hoe lang moet je de pols koelen voor het beste effect?",
        options: ["A) Ongeveer 10 tot 20 minuten.", "B) Minimaal een uur onafgebroken.", "C) Alleen de eerste 2 minuten."],
        answer: "A"
      }
    ]
  },
  {
    id: 11,
    title: "Sprinkleractivatie in de garage",
    scenario: "Er is een kleine autobrand in de parkeergarage onder het pand. De sprinklerinstallatie treedt in werking.",
    questions: [
      {
        question: "Wat zorgt er normaliter voor dat een sprinklerkop 'knapt' en gaat sproeien?",
        options: ["A) De detectie van rook door een optische sensor.", "B) De hitte van de brand die een glazen buisje of smeltzekering doet breken.", "C) Het indrukken van de handbrandmelder."],
        answer: "B"
      },
      {
        question: "Wat is het effect van de sprinkler op de brand?",
        options: ["A) De sprinkler blust altijd de volledige brand binnen 10 seconden.", "B) De sprinkler beheerst de brand en beperkt de uitbreiding totdat de brandweer er is.", "C) De sprinkler zorgt ervoor dat de rook direct uit het gebouw wordt gezogen."],
        answer: "B"
      }
    ]
  },
  {
    id: 12,
    title: "Schaafwond op een lastige plek",
    scenario: "Een medewerker heeft een vervelende schaafwond op de knokkel van zijn wijsvinger door het stoten tegen een stelling.",
    questions: [
      {
        question: "Welk hulpmiddel uit de EHBO-koffer is het meest geschikt om de pleister goed te laten zitten op dit gewricht?",
        options: ["A) Een normale pleister die je heel strak om de vinger wikkelt.", "B) Een pleisterkaart waarbij je inkepingen maakt zodat de pleister kan meebuigen.", "C) Een steriel gaasje met veel schilderstape."],
        answer: "B"
      },
      {
        question: "Waarom is het belangrijk om de wond eerst te reinigen?",
        options: ["A) Om te voorkomen dat de pleister loslaat door het vuil.", "B) Om infecties te voorkomen, omdat schaafwonden vaak vervuild zijn.", "C) Om de kleur van de wond beter te kunnen beoordelen voor de arts."],
        answer: "B"
      }
    ]
  },
  {
    id: 13,
    title: "Ernstige bloeding en shock",
    scenario: "Een collega heeft een slagaderlijke bloeding aan zijn bovenarm door een ongeval met een machine. Hij wordt suf en zijn hartslag is zeer snel maar zwak.",
    questions: [
      {
        question: "Wat is je prioriteit bij dit slachtoffer?",
        options: ["A) Het slachtoffer geruststellen en een deken halen.", "B) Direct de bloeding stelpen door krachtige druk op de wond uit te oefenen.", "C) Het slachtoffer in de stabiele zijligging leggen."],
        answer: "B"
      },
      {
        question: "Waarom leg je een slachtoffer met shockverschijnselen bij voorkeur plat neer?",
        options: ["A) Zodat hij niet kan wegrennen uit paniek.", "B) Om de bloedtoevoer naar de vitale organen (hersenen, hart) te ondersteunen.", "C) Omdat dit de enige manier is om een drukverband aan te leggen."],
        answer: "B"
      }
    ]
  },
  {
    id: 14,
    title: "Rookmelder in de kantine",
    scenario: "In de kantine hangt een optische rookmelder die plotseling afgaat omdat er brood is aangebrand in de broodrooster.",
    questions: [
      {
        question: "Hoe reageert een optische rookmelder?",
        options: ["A) Deze reageert op de onderbreking van een lichtstraal door rookdeeltjes.", "B) Deze reageert op de chemische samenstelling van verbrand brood.", "C) Deze reageert op de snelle stijging van de temperatuur in de kantine."],
        answer: "A"
      },
      {
        question: "Wat moet je doen als BHV'er nadat je hebt vastgesteld dat het loos alarm is?",
        options: ["A) De batterij uit de melder halen en in je zak steken.", "B) De melding verifiëren en de brandmeldcentrale herstellen (resetten) volgens protocol.", "C) De ruimte verlaten en de brandweer alsnog laten komen voor controle."],
        answer: "B"
      }
    ]
  },
  {
    id: 15,
    title: "Flauwte of meer?",
    scenario: "Iemand wordt onwel tijdens een warme zomerse dag, valt flauw maar komt na 30 seconden weer bij kennis.",
    questions: [
      {
        question: "Wat is de eerste hulp bij een 'gewone' flauwte als het slachtoffer weer bijkomt?",
        options: ["A) Direct 112 bellen voor een ambulance.", "B) Het slachtoffer nog even laten liggen en daarna langzaam overeind helpen; frisse lucht bieden.", "C) Het slachtoffer dwingen om een zware maaltijd te eten."],
        answer: "B"
      },
      {
        question: "Wanneer moet je bij een flauwte alsnog professionele hulp inschakelen?",
        options: ["A) Als het slachtoffer binnen 1 minuut nog niet bij bewustzijn is.", "B) Altijd, ongeacht hoe snel het slachtoffer bijkomt.", "C) Alleen als het slachtoffer dorst heeft."],
        answer: "A"
      }
    ]
  },
  {
    id: 16,
    title: "Gebruik van de AED bij een nat slachtoffer",
    scenario: "Een slachtoffer wordt uit een vijver gehaald en naar het droge gras gebracht. Hij ademt niet. De AED is gearriveerd.",
    questions: [
      {
        question: "Wat moet je doen voordat je de AED-elektroden plakt?",
        options: ["A) Niets, de elektroden werken ook prima onder water.", "B) De borstkas van het slachtoffer eerst goed droogwrijven.", "C) Wachten tot het slachtoffer helemaal opgedroogd is in de zon."],
        answer: "B"
      },
      {
        question: "Mag je een AED gebruiken als het slachtoffer op een metalen ondergrond ligt?",
        options: ["A) Nee, dat is altijd levensgevaarlijk voor de BHV'er.", "B) Ja, maar zorg dat de elektroden de metalen ondergrond niet direct raken en niemand het slachtoffer aanraakt tijdens de schok.", "C) Ja, metaal geleidt de schok beter, dus dat is effectiever."],
        answer: "B"
      }
    ]
  },
  {
    id: 17,
    title: "Verstikking in de kantine",
    scenario: "Een collega verslikt zich in een stuk vlees. Hij kan niet meer hoesten, praten of ademen en grijpt naar zijn keel.",
    questions: [
      {
        question: "Welke handeling voer je als eerste uit?",
        options: ["A) Je geeft maximaal 5 slagen tussen de schouderbladen.", "B) Je voert direct de Heimlich-greep (buikstoten) uit.", "C) Je laat het slachtoffer een groot glas water drinken."],
        answer: "A"
      },
      {
        question: "Wat doe je als de slagen tussen de schouderbladen niet helpen?",
        options: ["A) Je herhaalt de slagen nog 20 keer.", "B) Je gaat over op maximaal 5 buikstoten (Heimlich-greep).", "C) Je begint direct met reanimatie, ook al is hij nog bij bewustzijn."],
        answer: "B"
      }
    ]
  },
  {
    id: 18,
    title: "Handbrandmelder geactiveerd",
    scenario: "Iemand heeft in paniek een handbrandmelder ingedrukt bij de nooduitgang.",
    questions: [
      {
        question: "Wat is het directe gevolg van het indrukken van een handbrandmelder in een professionele installatie?",
        options: ["A) De sprinklerinstallatie gaat in het hele gebouw direct aan.", "B) Er gaat een melding naar de brandmeldcentrale en meestal gaat het ontruimingssignaal (slow-whoop) af.", "C) De stroom in het hele gebouw wordt direct afgesloten."],
        answer: "B"
      },
      {
        question: "Hoe herken je bij een handbrandmelder dat deze is geactiveerd?",
        options: ["A) Er komt een vlaggetje uit de onderkant.", "B) Het ruitje is ingedrukt of gebroken en er is vaak een gekleurd streepje (vaak geel of zwart) zichtbaar.", "C) De melder begint heel hard te roken."],
        answer: "B"
      }
    ]
  },
  {
    id: 19,
    title: "Kneuzing of breuk na val",
    scenario: "Een medewerker valt van een bureau en klaagt over hevige pijn in de enkel. De enkel is direct dik en het slachtoffer kan er niet op staan.",
    questions: [
      {
        question: "Je twijfelt of het een breuk of een ernstige verstuiking is. Hoe behandel je het?",
        options: ["A) Je behandelt het als een breuk (immobiliseren en arts raadplegen).", "B) Je dwingt het slachtoffer om te lopen om te kijken of het 'eruit trekt'.", "C) Je geeft een stevige massage om de zwelling te verminderen."],
        answer: "A"
      },
      {
        question: "Waarom is 'elevatie' (hoog leggen) belangrijk bij dit letsel?",
        options: ["A) Om te zorgen dat het slachtoffer niet wegloopt.", "B) Om de bloedtoevoer te verminderen en zo verdere zwelling en pijn te beperken.", "C) Omdat de enkel dan makkelijker te fotograferen is voor de verzekering."],
        answer: "B"
      }
    ]
  },
  {
    id: 20,
    title: "Reanimatie en vermoeidheid",
    scenario: "Je bent al enkele minuten alleen aan het reanimeren. Er is nog geen ambulance, maar wel een tweede BHV'er gearriveerd.",
    questions: [
      {
        question: "Wanneer is het juiste moment om te wisselen van reanimator?",
        options: ["A) Pas als de eerste BHV'er er letterlijk bij neerbelt van uitputting.", "B) Ongeveer elke 2 minuten (na 5 cycli van 30:2) om de kwaliteit van de borstcompressies hoog te houden.", "C) Nooit, wisselen kost te veel tijd en is slecht voor het slachtoffer."],
        answer: "B"
      },
      {
        question: "De AED geeft aan: \"Geen schok geadviseerd\". Wat doe je?",
        options: ["A) Je stopt met de hulpverlening en wacht op de ambulance.", "B) Je controleert direct de ademhaling; als deze nog ontbreekt, ga je direct door met reanimatie (30:2).", "C) Je zet de AED uit en probeert het slachtoffer rechtop te zetten."],
        answer: "B"
      }
    ]
  }
];
