import dnaArt from "@/assets/art/dna.webp";
import dnaTall from "@/assets/art/dna-tall.webp";
import chromosomeArt from "@/assets/art/chromosome.webp";
import proteinArt from "@/assets/art/protein.webp";
import rnaArt from "@/assets/art/rna.webp";
import brainArt from "@/assets/art/brain.webp";
import moleculeArt from "@/assets/art/molecule.webp";
import cellArt from "@/assets/art/cell.webp";
import tigerArt from "@/assets/art/tiger.webp";
import orangeArt from "@/assets/art/orange.webp";
import cottonArt from "@/assets/art/cotton.webp";

export const art = {
  dna: dnaArt,
  dnaTall,
  chromosome: chromosomeArt,
  protein: proteinArt,
  rna: rnaArt,
  brain: brainArt,
  molecule: moleculeArt,
  cell: cellArt,
  tiger: tigerArt,
  orange: orangeArt,
  cotton: cottonArt,
};

/* Stock photography (Pexels, free licence) */
const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const photos = {
  pipette: px(8940521, 900),
  screen: px(9574565),
  team: px(8851722),
  computer: px(8851456, 900),
  researchers: px(8442110),
  samples: px(9574332),
  multichannel: px(8940473),
  servers: px(4508751, 1800),
  serversWires: px(5480781),
  datacenter: px(37730212, 1600),
  practitioner: px(8442147, 900),
  tube: px(8442543),
  screen2: px(9574410),
  computer2: px(9574482, 900),
  teamBook: px(8851446, 900),
};

export const brand = {
  name: "GENX",
  domain: "GENX.COM",
  tagline: "Biological data. Intelligent discovery.",
  descriptor: "AI-driven bioinformatics and computational biology solutions.",
  regions: ["Nagpur", "Maharashtra", "Madhya Pradesh"],
  email: "hello@genx.com",
  location: "Nagpur, Maharashtra, India",
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export type Service = {
  id: string;
  code: string;
  title: string; // short title for accordion spines
  name: string; // full name
  short: string;
  art: string;
  tone: string;
  tags: string[];
  includes: string[];
  inputs: string;
  outputs: string;
};

export const services: Service[] = [
  {
    id: "ngs",
    code: "NGS",
    title: "NGS Analysis",
    name: "NGS Data Analysis",
    short:
      "End-to-end analysis of next-generation sequencing data — from raw reads to annotated, publication-ready results.",
    art: dnaArt,
    tone: "#C1E55B",
    tags: ["Illumina", "Nanopore", "PacBio"],
    includes: [
      "Read QC, trimming & contamination checks",
      "Alignment to reference genomes",
      "Variant calling & functional annotation",
      "Targeted panels & amplicon analysis",
      "Metagenomics & 16S profiling",
    ],
    inputs: "FASTQ · BAM / CRAM",
    outputs: "VCF · QC reports · annotated tables",
  },
  {
    id: "wgs",
    code: "WGS",
    title: "Whole Genome",
    name: "Whole Genome Sequencing (WGS)",
    short:
      "Genome-wide discovery of SNVs, indels, structural and copy-number variants for human, microbial, plant and animal genomes.",
    art: chromosomeArt,
    tone: "#B9D3EA",
    tags: ["Germline", "Somatic", "De novo"],
    includes: [
      "Germline & somatic variant calling",
      "Structural variants & CNV detection",
      "De novo assembly for non-model organisms",
      "Population genetics & phylogenomics",
      "Microbial typing & AMR gene detection",
    ],
    inputs: "FASTQ · 30× human / custom depth",
    outputs: "VCF · SV calls · assemblies",
  },
  {
    id: "wes",
    code: "WES",
    title: "Whole Exome",
    name: "Whole Exome Sequencing (WES)",
    short:
      "Focused analysis of protein-coding regions for rare-disease research, cancer studies and translational research workflows.",
    art: proteinArt,
    tone: "#ECE5D3",
    tags: ["Trio analysis", "Tumour–normal"],
    includes: [
      "Capture QC & coverage metrics",
      "Trio analysis & inheritance filtering",
      "Somatic tumour–normal analysis",
      "ACMG-guided variant prioritisation (research use)",
      "Gene panels & virtual panels",
    ],
    inputs: "FASTQ · capture kit BED",
    outputs: "Prioritised variants · coverage reports",
  },
  {
    id: "rnaseq",
    code: "RNA",
    title: "RNA-seq",
    name: "RNA-seq & Transcriptomics",
    short:
      "Quantify gene expression and uncover the pathways that drive biology — bulk, single-cell and small RNA.",
    art: rnaArt,
    tone: "#CFE3D4",
    tags: ["Bulk", "Single-cell", "Small RNA"],
    includes: [
      "Alignment & transcript quantification",
      "Differential expression analysis",
      "Pathway & gene-set enrichment",
      "Single-cell clustering & annotation",
      "Alternative splicing & fusion detection",
    ],
    inputs: "FASTQ · sample sheet",
    outputs: "Count matrices · DE tables · figures",
  },
  {
    id: "ai",
    code: "AI",
    title: "AI / ML",
    name: "AI & Machine Learning",
    short:
      "Custom models that learn from biological data — predicting phenotypes, classifying samples and finding hidden structure.",
    art: brainArt,
    tone: "#C3D3E4",
    tags: ["Deep learning", "Explainable AI"],
    includes: [
      "Biomarker discovery & feature selection",
      "Deep learning on sequences & images",
      "Risk & outcome prediction models",
      "Protein language models & embeddings",
      "Explainability reports (SHAP)",
    ],
    inputs: "Omics matrices · images · metadata",
    outputs: "Validated models · predictions · reports",
  },
  {
    id: "drug",
    code: "DD",
    title: "Drug Discovery",
    name: "Computational Drug Discovery",
    short:
      "Computational pipelines that shortlist promising molecules faster — from target identification to hit discovery.",
    art: moleculeArt,
    tone: "#DDEDB0",
    tags: ["Docking", "Virtual screening"],
    includes: [
      "Target identification from omics data",
      "Protein structure prediction",
      "Molecular docking & virtual screening",
      "ADMET & property prediction",
      "Molecular dynamics simulation",
    ],
    inputs: "Targets · compound libraries",
    outputs: "Ranked hits · binding poses · reports",
  },
  {
    id: "multiomics",
    code: "MO",
    title: "Multi-omics",
    name: "Multi-omics Integration",
    short:
      "Connect genome, transcriptome, proteome and metabolome into a single systems-level picture of biology.",
    art: cellArt,
    tone: "#D6E4F0",
    tags: ["Systems biology", "Networks"],
    includes: [
      "Cross-omics data harmonisation",
      "Integrative clustering & factor analysis",
      "Network & pathway modelling",
      "Microbiome–host integration",
      "Interactive dashboards & visual reports",
    ],
    inputs: "Multiple omics layers · metadata",
    outputs: "Integrated models · networks · dashboards",
  },
];

/* ------------------------------------------------------------------ */
/* Proposed projects                                                   */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    title: "Tiger Genomics",
    eyebrow: "Proposed · Vidarbha & MP",
    description:
      "A conservation genomics programme for Central India's tiger landscapes — using non-invasive DNA to study population structure, corridor connectivity and genetic health.",
    tags: ["Wildlife", "eDNA", "Population genetics"],
    art: tigerArt,
    tone: "#E6DCC6",
  },
  {
    title: "Orange Genome",
    eyebrow: "Proposed · Nagpur",
    description:
      "Genomic tools for the Nagpur mandarin — marker discovery for disease tolerance, fruit quality and climate resilience, designed with regional growers and researchers.",
    tags: ["Citrus", "GWAS", "Breeding"],
    art: orangeArt,
    tone: "#C1E55B",
  },
  {
    title: "Cotton & Soy",
    eyebrow: "Proposed · Vidarbha & MP",
    description:
      "Crop genomics for Vidarbha cotton and Madhya Pradesh soybean — variant discovery and genomic-selection models to support resilient, high-yield varieties.",
    tags: ["Agri-genomics", "Genomic selection"],
    art: cottonArt,
    tone: "#B9D3EA",
  },
  {
    title: "Precision Health",
    eyebrow: "Proposed · Central India",
    description:
      "A research framework for genomic diversity in Central Indian populations — supporting rare-disease and pharmacogenomics research with an ethics-first approach.",
    tags: ["Human genomics", "Pharmacogenomics"],
    art: chromosomeArt,
    tone: "#CFE3D4",
  },
];

/* ------------------------------------------------------------------ */
/* Workflow                                                            */
/* ------------------------------------------------------------------ */
export const pipeline = [
  { label: "Sample", meta: "Study design" },
  { label: "FASTQ", meta: "Raw reads" },
  { label: "QC", meta: "fastp · MultiQC" },
  { label: "Align", meta: "BWA-MEM2 · STAR" },
  { label: "Call", meta: "GATK · DESeq2" },
  { label: "AI model", meta: "PyTorch · XGBoost" },
  { label: "Insight", meta: "Reports" },
];

export const workflowSteps = [
  {
    title: "Consult & Design",
    text: "Every engagement will begin with your biological question. We'll help define study design, sample size, sequencing depth and success metrics before a single read is generated.",
    includes: [
      "Scientific consultation",
      "Study & experimental design",
      "Sequencing strategy & depth planning",
      "Budget and timeline scoping",
      "Ethics & data-sharing checklist",
    ],
    image: photos.team,
  },
  {
    title: "Data Intake & Quality Control",
    text: "Secure transfer of raw data followed by rigorous quality control — so every downstream result rests on solid ground.",
    includes: [
      "Encrypted data transfer",
      "Read quality & contamination checks",
      "Adapter trimming & filtering",
      "Sample identity & metadata validation",
      "QC summary report",
    ],
    image: photos.samples,
  },
  {
    title: "Analysis & AI Modelling",
    text: "Version-controlled pipelines running on HPC and GPU infrastructure, with machine learning layered on top wherever it adds real insight.",
    includes: [
      "Containerised, reproducible pipelines",
      "Variant calling & expression quantification",
      "Statistical & comparative analysis",
      "Machine-learning models with validation",
      "Benchmarking against public datasets",
    ],
    image: photos.screen,
  },
  {
    title: "Interpretation & Delivery",
    text: "Clear, publication-ready outputs with the biological context you need to act — and a team available to talk them through.",
    includes: [
      "Interactive reports & figures",
      "Biological interpretation",
      "Methods text for publications",
      "Raw & processed data handover",
      "Follow-up consultation",
    ],
    image: photos.researchers,
  },
];

/* ------------------------------------------------------------------ */
/* Regions                                                             */
/* ------------------------------------------------------------------ */
export const regions = [
  {
    name: "Nagpur",
    role: "Proposed headquarters",
    text: "At the geographic heart of India, Nagpur offers national connectivity, a growing education and healthcare base, and proximity to major agricultural and wildlife landscapes.",
    points: ["Core analysis & HPC hub", "Academic & clinical research outreach", "Local talent pipeline"],
  },
  {
    name: "Maharashtra",
    role: "Primary market",
    text: "One of India's largest research, pharmaceutical and biotech ecosystems — from Pune and Mumbai to the agricultural heartland of Vidarbha and Marathwada.",
    points: ["Pharma & biotech clusters", "Medical colleges & hospitals", "Agricultural universities"],
  },
  {
    name: "Madhya Pradesh",
    role: "Expansion market",
    text: "India's “Tiger State” and a leading soybean producer, with growing research institutions across Bhopal, Indore, Jabalpur and Gwalior.",
    points: ["Agri-genomics", "Wildlife & conservation genomics", "Medical & academic research"],
  },
];

export const audiences = [
  {
    title: "Academic researchers",
    text: "Labs that generate sequencing data but lack dedicated bioinformatics capacity or computing power.",
  },
  {
    title: "Hospitals & clinical research",
    text: "Research teams exploring genomics for rare disease, oncology and infectious disease — for research use.",
  },
  {
    title: "Agri-biotech & seed companies",
    text: "Breeders who need marker discovery, GWAS and genomic selection at scale.",
  },
  {
    title: "Pharma & CROs",
    text: "Teams seeking computational target discovery, virtual screening and omics analytics.",
  },
  {
    title: "Biotech startups",
    text: "Early-stage teams who need flexible, on-demand computational biology support.",
  },
];

export const comparison = [
  ["Sequencing data waits months for analysis", "Analysis-ready pipelines from day one"],
  ["Outsourced far away, slow to reach", "A regional team in Central India"],
  ["Black-box results with no methods", "Transparent, reproducible reports"],
  ["Generic tools, no AI", "AI models tuned to your question"],
  ["Scattered scripts and spreadsheets", "Version-controlled workflows"],
  ["Security as an afterthought", "Privacy and security by design"],
];

export const faqs = [
  {
    who: "A researcher in Nagpur asks…",
    q: "Is GENX operational today?",
    a: "Not yet. GENX.COM is a proposed startup in its planning stage. The services, infrastructure and projects on this website describe what we intend to build — we're currently speaking with researchers, institutions and partners to shape our first offerings.",
  },
  {
    who: "A lab head in Pune asks…",
    q: "What kinds of data will you work with?",
    a: "Our planned pipelines cover short- and long-read sequencing data (FASTQ, BAM/CRAM, VCF), expression matrices, single-cell data, protein structures and the clinical or phenotypic metadata that goes with them.",
  },
  {
    who: "A clinician in Bhopal asks…",
    q: "Will you offer clinical diagnostic reports?",
    a: "No. Our planned services are for research use only. Clinical diagnostics require accredited laboratories and regulatory approvals, which GENX does not hold.",
  },
  {
    who: "A data officer in Indore asks…",
    q: "How will you keep data secure?",
    a: "Security is designed in from the start: encrypted transfer and storage, role-based access, audit logs and India-region hosting options, aligned with India's Digital Personal Data Protection Act, 2023. No security certifications have been obtained yet.",
  },
];

export const moreFaqs = [
  {
    q: "Can we collaborate on a grant or research project?",
    a: "Yes. We're keen to co-develop pilot studies, grant proposals and long-term research programmes with institutions across Maharashtra and Madhya Pradesh.",
  },
  {
    q: "Will you offer training and workshops?",
    a: "Training is part of our plan — hands-on workshops in NGS analysis, R/Python for biology and reproducible pipelines for students and researchers.",
  },
  {
    q: "What will turnaround times look like?",
    a: "Timelines will depend on data type and scope. Typical targets will be shared with each proposal once services launch.",
  },
];

/* ------------------------------------------------------------------ */
/* Technology                                                          */
/* ------------------------------------------------------------------ */
export const infrastructure = [
  {
    key: "hpc",
    title: "High-performance computing",
    text: "A Linux compute cluster with SLURM scheduling, designed for genome-scale alignment, variant calling and assembly.",
    specs: ["Multi-core CPU nodes", "SLURM workload manager", "Parallel file system"],
  },
  {
    key: "gpu",
    title: "GPU acceleration",
    text: "NVIDIA GPU nodes for deep learning, protein-structure prediction and accelerated genomics.",
    specs: ["CUDA & PyTorch", "GPU-accelerated variant calling", "Structure prediction"],
  },
  {
    key: "cloud",
    title: "Hybrid cloud",
    text: "Burst capacity on public cloud with India-region data residency, for elastic and cost-efficient scaling.",
    specs: ["AWS · Google Cloud · Azure", "India-region hosting", "Object storage & archival"],
  },
  {
    key: "linux",
    title: "Linux & containers",
    text: "Reproducible environments built on Linux, containers and package managers — so every result can be re-run.",
    specs: ["Ubuntu · Rocky Linux", "Docker · Apptainer", "Conda · Bioconda"],
  },
];

export const toolGroups = [
  { name: "Workflow engines", tools: ["Nextflow", "nf-core", "Snakemake", "Git", "CI/CD"] },
  {
    name: "Genomics",
    tools: ["FastQC", "fastp", "MultiQC", "BWA-MEM2", "Bowtie2", "GATK", "DeepVariant", "bcftools", "VEP", "Manta", "CNVkit"],
  },
  { name: "Transcriptomics", tools: ["STAR", "Salmon", "featureCounts", "DESeq2", "edgeR", "Scanpy", "Seurat"] },
  { name: "Structure & chemistry", tools: ["AlphaFold", "ColabFold", "RDKit", "AutoDock Vina", "GROMACS", "PyMOL"] },
  { name: "AI / ML", tools: ["Python", "R", "PyTorch", "scikit-learn", "XGBoost", "Hugging Face", "SHAP"] },
];

export const databases = [
  "NCBI GenBank",
  "SRA",
  "dbSNP",
  "ClinVar",
  "gnomAD",
  "Ensembl",
  "UCSC Genome Browser",
  "1000 Genomes",
  "GEO",
  "TCGA",
  "UniProt",
  "PDB",
  "AlphaFold DB",
  "ChEMBL",
  "PubChem",
  "KEGG",
  "Reactome",
  "Gene Ontology",
];

export const aiLayers = [
  { name: "Delivery", meta: "Reports · dashboards · APIs" },
  { name: "Validation & explainability", meta: "Cross-validation · benchmarking · SHAP · uncertainty" },
  { name: "Model layer", meta: "Gradient boosting · CNNs · transformers · graph networks · protein language models" },
  { name: "Processing & features", meta: "QC · normalisation · embeddings · feature store" },
  { name: "Data ingestion", meta: "FASTQ · BAM · VCF · count matrices · images · metadata" },
];

export const security = [
  { item: "Encryption in transit and at rest", status: "Planned" },
  { item: "Role-based access & audit logging", status: "Planned" },
  { item: "India-region data residency options", status: "Planned" },
  { item: "Digital Personal Data Protection Act, 2023", status: "Designed to align" },
  { item: "ICMR ethical guidelines for human data", status: "Designed to align" },
  { item: "ISO/IEC 27001 certification", status: "Roadmap — not obtained" },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */
export const objectives = [
  "Launch core NGS, WGS, WES and RNA-seq analysis services on validated, reproducible pipelines.",
  "Build AI/ML and drug-discovery capabilities on dedicated GPU and HPC infrastructure.",
  "Partner with academic, clinical and agricultural institutions across Maharashtra and Madhya Pradesh.",
  "Train the next generation of bioinformaticians through workshops and internships.",
  "Establish strong data-security, privacy and research-ethics practices from day one.",
  "Grow into a nationally recognised computational biology company from Central India.",
];

export const roadmap = [
  { phase: "Phase 01", title: "Foundation", place: "Nagpur", text: "Company formation, core team, validated pipelines and first pilot collaborations." },
  { phase: "Phase 02", title: "Statewide", place: "Maharashtra", text: "Institutional partnerships, training programmes and service launch across the state." },
  { phase: "Phase 03", title: "Expansion", place: "Madhya Pradesh", text: "Agri-genomics and conservation-genomics programmes with regional institutions." },
  { phase: "Phase 04", title: "National scale", place: "India", text: "Expanded infrastructure, AI products and partnerships across the country." },
];

export const values = [
  { title: "Rigour", text: "Validated methods, benchmarked tools and statistics we can defend." },
  { title: "Transparency", text: "Open methods, honest timelines and clear communication about what we can and can't do." },
  { title: "Ethics", text: "Consent, privacy and responsible use of biological data at the centre of every project." },
  { title: "Accessibility", text: "World-class computational biology made reachable for Central India's researchers." },
];

export const roles = [
  { title: "Bioinformatics Scientist", type: "Full-time · Nagpur", points: ["NGS pipeline development", "Variant & expression analysis", "Scientific reporting"] },
  { title: "Machine Learning Engineer", type: "Full-time · Hybrid", points: ["Models on omics data", "GPU workflows & MLOps", "Explainable AI"] },
  { title: "Computational Chemist", type: "Full-time · Hybrid", points: ["Docking & virtual screening", "Molecular dynamics", "ADMET modelling"] },
  { title: "HPC & DevOps Engineer", type: "Full-time · Nagpur", points: ["Cluster & cloud operations", "Containers & CI/CD", "Security & monitoring"] },
  { title: "Partnerships Lead", type: "Full-time · Maharashtra / MP", points: ["Institutional outreach", "Grant & project development", "Client success"] },
];

export const enquiryTypes = [
  {
    key: "project",
    title: "Project enquiries",
    text: "Have sequencing data or a research question? Tell us about your study, data and timelines.",
  },
  {
    key: "partnership",
    title: "Institutional partnerships",
    text: "Universities, hospitals and research institutes interested in collaboration, training or shared infrastructure.",
  },
  {
    key: "business",
    title: "Business collaborations",
    text: "Investors, technology partners and companies exploring co-development or joint ventures.",
  },
];
