import type { ReactNode } from "react";
import type { ThemeColors } from "types/tui.type";

interface MarkdownBlockProps {
  content: string;
  colors: ThemeColors;
}

// Token types for inline markdown parsing
type InlineToken =
  | { type: "text"; content: string }
  | { type: "bold"; children: InlineToken[] }
  | { type: "italic"; children: InlineToken[] }
  | { type: "boldItalic"; children: InlineToken[] }
  | { type: "code"; content: string }
  | { type: "strikethrough"; children: InlineToken[] }
  | { type: "highlight"; children: InlineToken[] }
  | { type: "subscript"; content: string }
  | { type: "superscript"; content: string }
  | { type: "link"; text: string; href: string; title?: string }
  | { type: "autolink"; href: string }
  | { type: "email"; address: string }
  | { type: "footnoteRef"; id: string }
  | { type: "emoji"; shortcode: string; emoji: string };

// Block-level token types
type BlockToken =
  | { type: "paragraph"; children: InlineToken[] }
  | { type: "heading"; level: number; children: InlineToken[]; id?: string }
  | { type: "blockquote"; children: BlockToken[]; depth: number }
  | {
      type: "listItem";
      children: InlineToken[];
      ordered: boolean;
      index?: number;
      indent: number;
    }
  | { type: "taskListItem"; children: InlineToken[]; checked: boolean; indent: number }
  | { type: "hr" }
  | { type: "table"; headers: TableCell[]; alignments: TableAlignment[]; rows: TableCell[][] }
  | { type: "definitionTerm"; content: string }
  | { type: "definitionDesc"; children: InlineToken[] }
  | { type: "footnote"; id: string; children: InlineToken[] }
  | { type: "emptyLine" };

type TableCell = { children: InlineToken[] };
type TableAlignment = "left" | "center" | "right" | "none";

// Common emoji shortcodes mapping
const EMOJI_MAP: Record<string, string> = {
  smile: "😊",
  laughing: "😆",
  blush: "😊",
  smiley: "😃",
  relaxed: "☺️",
  smirk: "😏",
  heart_eyes: "😍",
  kissing_heart: "😘",
  kissing_closed_eyes: "😚",
  flushed: "😳",
  relieved: "😌",
  satisfied: "😆",
  grin: "😁",
  wink: "😉",
  stuck_out_tongue_winking_eye: "😜",
  stuck_out_tongue_closed_eyes: "😝",
  grinning: "😀",
  kissing: "😗",
  kissing_smiling_eyes: "😙",
  stuck_out_tongue: "😛",
  sleeping: "😴",
  worried: "😟",
  frowning: "😦",
  anguished: "😧",
  open_mouth: "😮",
  grimacing: "😬",
  confused: "😕",
  hushed: "😯",
  expressionless: "😑",
  unamused: "😒",
  sweat_smile: "😅",
  sweat: "😓",
  disappointed_relieved: "😥",
  weary: "😩",
  pensive: "😔",
  disappointed: "😞",
  confounded: "😖",
  fearful: "😨",
  cold_sweat: "😰",
  persevere: "😣",
  cry: "😢",
  sob: "😭",
  joy: "😂",
  astonished: "😲",
  scream: "😱",
  tired_face: "😫",
  angry: "😠",
  rage: "😡",
  triumph: "😤",
  sleepy: "😪",
  yum: "😋",
  mask: "😷",
  sunglasses: "😎",
  dizzy_face: "😵",
  imp: "👿",
  smiling_imp: "😈",
  neutral_face: "😐",
  no_mouth: "😶",
  innocent: "😇",
  alien: "👽",
  yellow_heart: "💛",
  blue_heart: "💙",
  purple_heart: "💜",
  heart: "❤️",
  green_heart: "💚",
  broken_heart: "💔",
  heartbeat: "💓",
  heartpulse: "💗",
  two_hearts: "💕",
  revolving_hearts: "💞",
  cupid: "💘",
  sparkling_heart: "💖",
  sparkles: "✨",
  star: "⭐",
  star2: "🌟",
  dizzy: "💫",
  boom: "💥",
  collision: "💥",
  anger: "💢",
  exclamation: "❗",
  question: "❓",
  grey_exclamation: "❕",
  grey_question: "❔",
  zzz: "💤",
  dash: "💨",
  sweat_drops: "💦",
  notes: "🎶",
  musical_note: "🎵",
  fire: "🔥",
  hankey: "💩",
  poop: "💩",
  shit: "💩",
  thumbsup: "👍",
  "+1": "👍",
  thumbsdown: "👎",
  "-1": "👎",
  ok_hand: "👌",
  punch: "👊",
  facepunch: "👊",
  fist: "✊",
  v: "✌️",
  wave: "👋",
  hand: "✋",
  raised_hand: "✋",
  open_hands: "👐",
  point_up: "☝️",
  point_down: "👇",
  point_left: "👈",
  point_right: "👉",
  raised_hands: "🙌",
  pray: "🙏",
  point_up_2: "👆",
  clap: "👏",
  muscle: "💪",
  metal: "🤘",
  fu: "🖕",
  walking: "🚶",
  runner: "🏃",
  running: "🏃",
  couple: "👫",
  family: "👪",
  two_men_holding_hands: "👬",
  two_women_holding_hands: "👭",
  dancer: "💃",
  dancers: "👯",
  ok_woman: "🙆",
  no_good: "🙅",
  information_desk_person: "💁",
  raising_hand: "🙋",
  bride_with_veil: "👰",
  person_with_pouting_face: "🙎",
  person_frowning: "🙍",
  bow: "🙇",
  couplekiss: "💏",
  couple_with_heart: "💑",
  massage: "💆",
  haircut: "💇",
  nail_care: "💅",
  boy: "👦",
  girl: "👧",
  woman: "👩",
  man: "👨",
  baby: "👶",
  older_woman: "👵",
  older_man: "👴",
  cop: "👮",
  angel: "👼",
  princess: "👸",
  guardsman: "💂",
  skull: "💀",
  feet: "🐾",
  lips: "👄",
  kiss: "💋",
  droplet: "💧",
  ear: "👂",
  eyes: "👀",
  nose: "👃",
  tongue: "👅",
  love_letter: "💌",
  bust_in_silhouette: "👤",
  busts_in_silhouette: "👥",
  speech_balloon: "💬",
  thought_balloon: "💭",
  sunny: "☀️",
  umbrella: "☔",
  cloud: "☁️",
  snowflake: "❄️",
  snowman: "⛄",
  zap: "⚡",
  cyclone: "🌀",
  foggy: "🌁",
  ocean: "🌊",
  cat: "🐱",
  dog: "🐶",
  mouse: "🐭",
  hamster: "🐹",
  rabbit: "🐰",
  wolf: "🐺",
  frog: "🐸",
  tiger: "🐯",
  koala: "🐨",
  bear: "🐻",
  pig: "🐷",
  cow: "🐮",
  boar: "🐗",
  monkey_face: "🐵",
  monkey: "🐒",
  horse: "🐴",
  racehorse: "🐎",
  camel: "🐫",
  sheep: "🐑",
  elephant: "🐘",
  snake: "🐍",
  bird: "🐦",
  baby_chick: "🐤",
  chicken: "🐔",
  penguin: "🐧",
  bug: "🐛",
  octopus: "🐙",
  fish: "🐟",
  whale: "🐳",
  dolphin: "🐬",
  turtle: "🐢",
  snail: "🐌",
  bee: "🐝",
  ant: "🐜",
  beetle: "🐞",
  butterfly: "🦋",
  cherry_blossom: "🌸",
  tulip: "🌷",
  four_leaf_clover: "🍀",
  rose: "🌹",
  sunflower: "🌻",
  hibiscus: "🌺",
  maple_leaf: "🍁",
  leaves: "🍃",
  fallen_leaf: "🍂",
  herb: "🌿",
  mushroom: "🍄",
  cactus: "🌵",
  palm_tree: "🌴",
  evergreen_tree: "🌲",
  deciduous_tree: "🌳",
  chestnut: "🌰",
  seedling: "🌱",
  blossom: "🌼",
  ear_of_rice: "🌾",
  shell: "🐚",
  globe_with_meridians: "🌐",
  sun_with_face: "🌞",
  full_moon_with_face: "🌝",
  new_moon_with_face: "🌚",
  new_moon: "🌑",
  waxing_crescent_moon: "🌒",
  first_quarter_moon: "🌓",
  waxing_gibbous_moon: "🌔",
  full_moon: "🌕",
  waning_gibbous_moon: "🌖",
  last_quarter_moon: "🌗",
  waning_crescent_moon: "🌘",
  last_quarter_moon_with_face: "🌜",
  first_quarter_moon_with_face: "🌛",
  moon: "🌔",
  earth_africa: "🌍",
  earth_americas: "🌎",
  earth_asia: "🌏",
  volcano: "🌋",
  milky_way: "🌌",
  partly_sunny: "⛅",
  rocket: "🚀",
  helicopter: "🚁",
  steam_locomotive: "🚂",
  railway_car: "🚃",
  bullettrain_side: "🚄",
  bullettrain_front: "🚅",
  train2: "🚆",
  metro: "🚇",
  light_rail: "🚈",
  station: "🚉",
  tram: "🚊",
  bus: "🚌",
  oncoming_bus: "🚍",
  trolleybus: "🚎",
  taxi: "🚕",
  oncoming_taxi: "🚖",
  car: "🚗",
  red_car: "🚗",
  oncoming_automobile: "🚘",
  blue_car: "🚙",
  truck: "🚚",
  articulated_lorry: "🚛",
  tractor: "🚜",
  bike: "🚲",
  busstop: "🚏",
  fuelpump: "⛽",
  construction: "🚧",
  anchor: "⚓",
  boat: "⛵",
  sailboat: "⛵",
  speedboat: "🚤",
  ship: "🚢",
  airplane: "✈️",
  seat: "💺",
  tent: "⛺",
  camping: "🏕️",
  house: "🏠",
  house_with_garden: "🏡",
  office: "🏢",
  post_office: "🏣",
  hospital: "🏥",
  bank: "🏦",
  atm: "🏧",
  hotel: "🏨",
  love_hotel: "🏩",
  convenience_store: "🏪",
  school: "🏫",
  church: "⛪",
  fountain: "⛲",
  department_store: "🏬",
  factory: "🏭",
  izakaya_lantern: "🏮",
  japanese_castle: "🏯",
  european_castle: "🏰",
  checkered_flag: "🏁",
  crossed_flags: "🎌",
  flag: "📍",
  warning: "⚠️",
  no_entry: "⛔",
  x: "❌",
  o: "⭕",
  bangbang: "‼️",
  interrobang: "⁉️",
  100: "💯",
  check: "✔️",
  white_check_mark: "✅",
  heavy_check_mark: "✔️",
  heavy_multiplication_x: "✖️",
  negative_squared_cross_mark: "❎",
  arrow_up: "⬆️",
  arrow_down: "⬇️",
  arrow_left: "⬅️",
  arrow_right: "➡️",
  arrow_upper_left: "↖️",
  arrow_upper_right: "↗️",
  arrow_lower_left: "↙️",
  arrow_lower_right: "↘️",
  left_right_arrow: "↔️",
  arrow_up_down: "↕️",
  leftwards_arrow_with_hook: "↩️",
  arrow_right_hook: "↪️",
  information_source: "ℹ️",
  abc: "🔤",
  abcd: "🔡",
  capital_abcd: "🔠",
  symbols: "🔣",
  1234: "🔢",
  zero: "0️⃣",
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
  eight: "8️⃣",
  nine: "9️⃣",
  keycap_ten: "🔟",
  hash: "#️⃣",
  copyright: "©️",
  registered: "®️",
  tm: "™️",
  clock1: "🕐",
  clock2: "🕑",
  clock3: "🕒",
  clock4: "🕓",
  clock5: "🕔",
  clock6: "🕕",
  clock7: "🕖",
  clock8: "🕗",
  clock9: "🕘",
  clock10: "🕙",
  clock11: "🕚",
  clock12: "🕛",
};

// Parse inline markdown tokens from a line of text (recursive for nested formatting)
function parseInlineTokens(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let matched = false;

    // Escaped characters (backslash escape)
    const escapeMatch = remaining.match(/^\\([\\`*_{}[\]<>()#+\-.!|])/);
    if (escapeMatch?.[1]) {
      tokens.push({ type: "text", content: escapeMatch[1] });
      remaining = remaining.slice(escapeMatch[0].length);
      matched = true;
      continue;
    }

    // Emoji shortcodes (:emoji:)
    const emojiMatch = remaining.match(/^:([a-zA-Z0-9_+-]+):/);
    if (emojiMatch?.[1]) {
      const shortcode = emojiMatch[1].toLowerCase();
      const emoji = EMOJI_MAP[shortcode];
      if (emoji) {
        tokens.push({ type: "emoji", shortcode, emoji });
        remaining = remaining.slice(emojiMatch[0].length);
        matched = true;
        continue;
      }
    }

    // Footnote reference [^id]
    const footnoteRefMatch = remaining.match(/^\[\^([^\]]+)\]/);
    if (footnoteRefMatch?.[1] && !remaining.startsWith("[^") === false) {
      // Make sure it's not a footnote definition
      const afterMatch = remaining.slice(footnoteRefMatch[0].length);
      if (!afterMatch.startsWith(":")) {
        tokens.push({ type: "footnoteRef", id: footnoteRefMatch[1] });
        remaining = remaining.slice(footnoteRefMatch[0].length);
        matched = true;
        continue;
      }
    }

    // Double backtick code (``code with `backticks` inside``)
    const doubleCodeMatch = remaining.match(/^``(.+?)``/);
    if (doubleCodeMatch?.[1]) {
      tokens.push({ type: "code", content: doubleCodeMatch[1] });
      remaining = remaining.slice(doubleCodeMatch[0].length);
      matched = true;
      continue;
    }

    // Inline code (`code`)
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch?.[1]) {
      tokens.push({ type: "code", content: codeMatch[1] });
      remaining = remaining.slice(codeMatch[0].length);
      matched = true;
      continue;
    }

    // Highlight (==text==)
    const highlightMatch = remaining.match(/^==(.+?)==/);
    if (highlightMatch?.[1]) {
      tokens.push({ type: "highlight", children: parseInlineTokens(highlightMatch[1]) });
      remaining = remaining.slice(highlightMatch[0].length);
      matched = true;
      continue;
    }

    // Superscript (^text^)
    const superscriptMatch = remaining.match(/^\^([^^]+)\^/);
    if (superscriptMatch?.[1]) {
      tokens.push({ type: "superscript", content: superscriptMatch[1] });
      remaining = remaining.slice(superscriptMatch[0].length);
      matched = true;
      continue;
    }

    // Subscript (~text~) - single tilde, but not double (strikethrough)
    const subscriptMatch = remaining.match(/^~([^~]+)~/);
    if (subscriptMatch?.[1] && !remaining.startsWith("~~")) {
      tokens.push({ type: "subscript", content: subscriptMatch[1] });
      remaining = remaining.slice(subscriptMatch[0].length);
      matched = true;
      continue;
    }

    // Strikethrough (~~text~~)
    const strikeMatch = remaining.match(/^~~(.+?)~~/);
    if (strikeMatch?.[1]) {
      tokens.push({ type: "strikethrough", children: parseInlineTokens(strikeMatch[1]) });
      remaining = remaining.slice(strikeMatch[0].length);
      matched = true;
      continue;
    }

    // Bold + Italic (***text*** or ___text___)
    const boldItalicMatch = remaining.match(/^(\*\*\*|___)(.+?)\1/);
    if (boldItalicMatch?.[2]) {
      tokens.push({ type: "boldItalic", children: parseInlineTokens(boldItalicMatch[2]) });
      remaining = remaining.slice(boldItalicMatch[0].length);
      matched = true;
      continue;
    }

    // Bold (**text** or __text__)
    const boldMatch = remaining.match(/^(\*\*|__)(.+?)\1/);
    if (boldMatch?.[2]) {
      tokens.push({ type: "bold", children: parseInlineTokens(boldMatch[2]) });
      remaining = remaining.slice(boldMatch[0].length);
      matched = true;
      continue;
    }

    // Italic (*text* or _text_)
    const italicMatch = remaining.match(/^(\*|_)([^*_]+?)\1/);
    if (italicMatch?.[2]) {
      tokens.push({ type: "italic", children: parseInlineTokens(italicMatch[2]) });
      remaining = remaining.slice(italicMatch[0].length);
      matched = true;
      continue;
    }

    // Auto-linked URLs (<https://...> or <http://...>)
    const autoLinkMatch = remaining.match(/^<(https?:\/\/[^>]+)>/);
    if (autoLinkMatch?.[1]) {
      tokens.push({ type: "autolink", href: autoLinkMatch[1] });
      remaining = remaining.slice(autoLinkMatch[0].length);
      matched = true;
      continue;
    }

    // Auto-linked email (<email@example.com>)
    const emailMatch = remaining.match(/^<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/);
    if (emailMatch?.[1]) {
      tokens.push({ type: "email", address: emailMatch[1] });
      remaining = remaining.slice(emailMatch[0].length);
      matched = true;
      continue;
    }

    // Links with title [text](url "title")
    const linkWithTitleMatch = remaining.match(/^\[([^\]]+)\]\(([^)\s]+)\s+"([^"]+)"\)/);
    if (linkWithTitleMatch?.[1] && linkWithTitleMatch[2]) {
      const linkToken: InlineToken = {
        type: "link",
        text: linkWithTitleMatch[1],
        href: linkWithTitleMatch[2],
      };
      if (linkWithTitleMatch[3]) {
        linkToken.title = linkWithTitleMatch[3];
      }
      tokens.push(linkToken);
      remaining = remaining.slice(linkWithTitleMatch[0].length);
      matched = true;
      continue;
    }

    // Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch?.[1] && linkMatch[2]) {
      tokens.push({ type: "link", text: linkMatch[1], href: linkMatch[2] });
      remaining = remaining.slice(linkMatch[0].length);
      matched = true;
      continue;
    }

    // Automatic URL linking (bare URLs)
    const bareUrlMatch = remaining.match(/^(https?:\/\/[^\s<>[\]()]+)/);
    if (bareUrlMatch?.[1]) {
      tokens.push({ type: "autolink", href: bareUrlMatch[1] });
      remaining = remaining.slice(bareUrlMatch[0].length);
      matched = true;
      continue;
    }

    // Plain text - consume until next potential markdown character
    if (!matched) {
      const nextSpecial = remaining.slice(1).search(/[\\*_`~=^[\]<:]/);
      if (nextSpecial === -1) {
        tokens.push({ type: "text", content: remaining });
        break;
      }
      tokens.push({ type: "text", content: remaining.slice(0, nextSpecial + 1) });
      remaining = remaining.slice(nextSpecial + 1);
    }
  }

  return tokens;
}

// Parse table row into cells
function parseTableRow(row: string): string[] {
  // Remove leading/trailing pipes and split
  const trimmed = row.trim().replace(/^\||\|$/g, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

// Parse table alignment row
function parseTableAlignments(row: string): TableAlignment[] {
  const cells = parseTableRow(row);
  return cells.map((cell) => {
    const trimmed = cell.trim();
    const leftColon = trimmed.startsWith(":");
    const rightColon = trimmed.endsWith(":");
    if (leftColon && rightColon) return "center";
    if (rightColon) return "right";
    if (leftColon) return "left";
    return "none";
  });
}

// Check if a line is a table separator row
function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  // Must contain at least one | and be made of :, -, |, and spaces
  return /^\|?[\s:|-]+\|?$/.test(trimmed) && trimmed.includes("-") && trimmed.includes("|");
}

// Parse block-level markdown elements
function parseBlocks(content: string): BlockToken[] {
  const lines = content.split("\n");
  const tokens: BlockToken[] = [];
  let i = 0;

  // First pass: collect footnote definitions
  const footnotes: Map<string, string> = new Map();
  for (let j = 0; j < lines.length; j++) {
    const line = lines[j] ?? "";
    const footnoteDefMatch = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (footnoteDefMatch?.[1]) {
      footnotes.set(footnoteDefMatch[1], footnoteDefMatch[2] ?? "");
    }
  }

  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmedLine = line.trim();
    const leadingSpaces = line.length - line.trimStart().length;
    const indent = Math.floor(leadingSpaces / 2); // 2 spaces = 1 indent level

    // Empty line
    if (trimmedLine === "") {
      tokens.push({ type: "emptyLine" });
      i++;
      continue;
    }

    // Footnote definition [^id]: text (skip, already collected)
    const footnoteDefMatch = trimmedLine.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (footnoteDefMatch?.[1]) {
      tokens.push({
        type: "footnote",
        id: footnoteDefMatch[1],
        children: parseInlineTokens(footnoteDefMatch[2] ?? ""),
      });
      i++;
      continue;
    }

    // Table detection
    if (i + 1 < lines.length && isTableSeparator(lines[i + 1] ?? "")) {
      const headerCells = parseTableRow(trimmedLine);
      const alignments = parseTableAlignments(lines[i + 1] ?? "");
      const headers: TableCell[] = headerCells.map((cell) => ({
        children: parseInlineTokens(cell),
      }));
      const rows: TableCell[][] = [];

      i += 2; // Skip header and separator

      // Parse table rows
      while (i < lines.length) {
        const rowLine = lines[i]?.trim() ?? "";
        if (!rowLine || !rowLine.includes("|")) break;

        const rowCells = parseTableRow(rowLine);
        rows.push(
          rowCells.map((cell) => ({
            children: parseInlineTokens(cell),
          }))
        );
        i++;
      }

      tokens.push({ type: "table", headers, alignments, rows });
      continue;
    }

    // Horizontal rule (---, ***, ___)
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmedLine)) {
      tokens.push({ type: "hr" });
      i++;
      continue;
    }

    // Setext-style heading (underline with === or ---)
    if (i + 1 < lines.length) {
      const nextLine = lines[i + 1]?.trim() ?? "";
      if (/^=+$/.test(nextLine) && trimmedLine.length > 0) {
        tokens.push({
          type: "heading",
          level: 1,
          children: parseInlineTokens(trimmedLine),
        });
        i += 2;
        continue;
      }
      if (/^-+$/.test(nextLine) && trimmedLine.length > 0 && !/^[-*+]\s/.test(trimmedLine)) {
        tokens.push({
          type: "heading",
          level: 2,
          children: parseInlineTokens(trimmedLine),
        });
        i += 2;
        continue;
      }
    }

    // ATX-style headings (# to ######) with optional custom ID {#custom-id}
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([^}]+)\})?$/);
    if (headingMatch?.[1] && headingMatch[2]) {
      const headingToken: BlockToken = {
        type: "heading",
        level: headingMatch[1].length,
        children: parseInlineTokens(headingMatch[2]),
      };
      if (headingMatch[3]) {
        headingToken.id = headingMatch[3];
      }
      tokens.push(headingToken);
      i++;
      continue;
    }

    // Nested blockquote (>> or >>>)
    const nestedBlockquoteMatch = trimmedLine.match(/^(>+)\s*(.*)$/);
    if (nestedBlockquoteMatch?.[1]) {
      const depth = nestedBlockquoteMatch[1].length;
      const content = nestedBlockquoteMatch[2] ?? "";
      tokens.push({
        type: "blockquote",
        children: content ? [{ type: "paragraph", children: parseInlineTokens(content) }] : [],
        depth,
      });
      i++;
      continue;
    }

    // Task list item (- [ ] or - [x])
    const taskMatch = trimmedLine.match(/^[-*+]\s+\[([ xX])\]\s+(.+)$/);
    if (taskMatch) {
      tokens.push({
        type: "taskListItem",
        children: parseInlineTokens(taskMatch[2] ?? ""),
        checked: taskMatch[1]?.toLowerCase() === "x",
        indent,
      });
      i++;
      continue;
    }

    // Unordered list item (- or * or +)
    const unorderedListMatch = trimmedLine.match(/^[-*+]\s+(.+)$/);
    if (unorderedListMatch?.[1]) {
      tokens.push({
        type: "listItem",
        children: parseInlineTokens(unorderedListMatch[1]),
        ordered: false,
        indent,
      });
      i++;
      continue;
    }

    // Ordered list item (1. 2. etc)
    const orderedListMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (orderedListMatch?.[1] && orderedListMatch[2]) {
      tokens.push({
        type: "listItem",
        children: parseInlineTokens(orderedListMatch[2]),
        ordered: true,
        index: Number.parseInt(orderedListMatch[1], 10),
        indent,
      });
      i++;
      continue;
    }

    // Definition list term (next line starts with : )
    if (i + 1 < lines.length) {
      const nextLine = lines[i + 1]?.trim() ?? "";
      if (nextLine.startsWith(": ")) {
        tokens.push({ type: "definitionTerm", content: trimmedLine });
        i++;
        continue;
      }
    }

    // Definition list description (: definition)
    const defMatch = trimmedLine.match(/^:\s+(.+)$/);
    if (defMatch?.[1]) {
      tokens.push({
        type: "definitionDesc",
        children: parseInlineTokens(defMatch[1]),
      });
      i++;
      continue;
    }

    // Regular paragraph - parse inline elements
    tokens.push({
      type: "paragraph",
      children: parseInlineTokens(trimmedLine),
    });
    i++;
  }

  return tokens;
}

// Helper to get plain text from inline tokens
function getPlainTextFromTokens(tokens: InlineToken[]): string {
  return tokens
    .map((t) => {
      switch (t.type) {
        case "text":
          return t.content;
        case "bold":
        case "italic":
        case "boldItalic":
        case "strikethrough":
        case "highlight":
          return getPlainTextFromTokens(t.children);
        case "code":
        case "subscript":
        case "superscript":
          return t.content;
        case "link":
          return t.text;
        case "autolink":
          return t.href;
        case "email":
          return t.address;
        case "footnoteRef":
          return `[^${t.id}]`;
        case "emoji":
          return t.emoji;
        default:
          return "";
      }
    })
    .join("");
}

// Render inline tokens to React elements
function renderInlineTokens(tokens: InlineToken[], colors: ThemeColors): ReactNode[] {
  return tokens.map((token, key) => renderInlineToken(token, colors, key));
}

function renderInlineToken(token: InlineToken, colors: ThemeColors, key: number): ReactNode {
  switch (token.type) {
    case "text":
      return token.content;

    case "bold":
      return <strong key={key}>{getPlainTextFromTokens(token.children)}</strong>;

    case "italic":
      return <em key={key}>{getPlainTextFromTokens(token.children)}</em>;

    case "boldItalic":
      return (
        <strong key={key}>
          <em>{getPlainTextFromTokens(token.children)}</em>
        </strong>
      );

    case "code":
      return (
        <span key={key} fg={colors.accent} bg={colors.bg3}>
          {` ${token.content} `}
        </span>
      );

    case "strikethrough":
      // Use strikethrough character representation since OpenTUI doesn't support nested elements
      return (
        <span key={key} fg={colors.fg4}>
          {`~${getPlainTextFromTokens(token.children)}~`}
        </span>
      );

    case "highlight":
      return (
        <span key={key} fg={colors.bg1} bg={colors.warning}>
          {getPlainTextFromTokens(token.children)}
        </span>
      );

    case "subscript":
      return (
        <span key={key} fg={colors.fg3}>
          ₍{token.content}₎
        </span>
      );

    case "superscript":
      return (
        <span key={key} fg={colors.fg3}>
          ⁽{token.content}⁾
        </span>
      );

    case "link":
      // Render link as underlined text followed by URL - using <u> directly
      return (
        <u key={key}>
          {token.text} ({token.href})
        </u>
      );

    case "autolink":
      return <u key={key}>{token.href}</u>;

    case "email":
      return <u key={key}>{token.address}</u>;

    case "footnoteRef":
      return (
        <span key={key} fg={colors.secondary}>
          [^{token.id}]
        </span>
      );

    case "emoji":
      return token.emoji;

    default:
      return null;
  }
}

// Render a block token
function renderBlockToken(token: BlockToken, colors: ThemeColors, key: number): ReactNode {
  switch (token.type) {
    case "paragraph":
      return (
        <box key={`para-${key}`} style={{ marginBottom: 1 }}>
          <text fg={colors.fg1}>{renderInlineTokens(token.children, colors)}</text>
        </box>
      );

    case "heading": {
      const headingColors: Record<number, string> = {
        1: colors.primary,
        2: colors.secondary,
        3: colors.accent,
        4: colors.info,
        5: colors.fg2,
        6: colors.fg3,
      };
      return (
        <box key={`h${token.level}-${key}`} style={{ marginTop: 1, marginBottom: 1 }}>
          <text fg={headingColors[token.level] || colors.fg1}>
            <strong>{getPlainTextFromTokens(token.children)}</strong>
          </text>
        </box>
      );
    }

    case "blockquote": {
      const prefix = "│ ".repeat(token.depth);
      return (
        <box
          key={`bq-${key}`}
          style={{ flexDirection: "row", marginBottom: 1, paddingLeft: 2 }}
        >
          <text fg={colors.border2}>{prefix}</text>
          <text fg={colors.fg3}>
            <em>
              {token.children.map((child) =>
                child.type === "paragraph" ? getPlainTextFromTokens(child.children) : null
              )}
            </em>
          </text>
        </box>
      );
    }

    case "listItem": {
      const bullet = token.ordered ? `${String(token.index ?? 1).padStart(2, " ")}.` : " •";
      const indentPadding = 2 + token.indent * 3;
      return (
        <box key={`li-${key}`} style={{ flexDirection: "row", paddingLeft: indentPadding }}>
          <text fg={colors.accent}>{bullet} </text>
          <text fg={colors.fg1}>{renderInlineTokens(token.children, colors)}</text>
        </box>
      );
    }

    case "taskListItem": {
      const checkbox = token.checked ? "☑" : "☐";
      const checkColor = token.checked ? colors.success : colors.fg4;
      const indentPadding = 2 + token.indent * 3;
      return (
        <box key={`task-${key}`} style={{ flexDirection: "row", paddingLeft: indentPadding }}>
          <text fg={checkColor}>{checkbox} </text>
          <text fg={token.checked ? colors.fg3 : colors.fg1}>
            {renderInlineTokens(token.children, colors)}
          </text>
        </box>
      );
    }

    case "hr":
      return (
        <box key={`hr-${key}`} style={{ marginTop: 1, marginBottom: 1 }}>
          <text fg={colors.border1}>{"─".repeat(50)}</text>
        </box>
      );

    case "table":
      return renderTable(token, colors, key);

    case "definitionTerm":
      return (
        <box key={`dt-${key}`} style={{ marginTop: 1 }}>
          <text fg={colors.primary}>
            <strong>{token.content}</strong>
          </text>
        </box>
      );

    case "definitionDesc":
      return (
        <box
          key={`dd-${key}`}
          style={{ flexDirection: "row", paddingLeft: 4, marginBottom: 1 }}
        >
          <text fg={colors.fg4}>: </text>
          <text fg={colors.fg2}>{renderInlineTokens(token.children, colors)}</text>
        </box>
      );

    case "footnote":
      return (
        <box key={`fn-${key}`} style={{ flexDirection: "row", marginTop: 1 }}>
          <text fg={colors.secondary}>[^{token.id}]: </text>
          <text fg={colors.fg3}>{renderInlineTokens(token.children, colors)}</text>
        </box>
      );

    case "emptyLine":
      return null;

    default:
      return null;
  }
}

// Render a table
function renderTable(
  table: BlockToken & { type: "table" },
  colors: ThemeColors,
  key: number
): ReactNode {
  const MAX_COL_WIDTH = 25; // Maximum column width before wrapping
  const MIN_COL_WIDTH = 8; // Minimum column width
  const columnWidths: number[] = [];

  // Calculate column widths from headers (capped at MAX_COL_WIDTH)
  for (let i = 0; i < table.headers.length; i++) {
    const header = table.headers[i];
    const headerText = getInlineTokensText(header?.children ?? []);
    columnWidths[i] = Math.min(Math.max(headerText.length, MIN_COL_WIDTH), MAX_COL_WIDTH);
  }

  // Update widths based on row content (capped at MAX_COL_WIDTH)
  for (const row of table.rows) {
    for (let i = 0; i < row.length; i++) {
      const cell = row[i];
      const cellText = getInlineTokensText(cell?.children ?? []);
      const currentWidth = columnWidths[i] ?? MIN_COL_WIDTH;
      columnWidths[i] = Math.min(Math.max(currentWidth, cellText.length), MAX_COL_WIDTH);
    }
  }

  // Helper to wrap text into multiple lines
  const wrapText = (text: string, maxLen: number): string[] => {
    if (text.length <= maxLen) return [text];

    const lines: string[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      if (remaining.length <= maxLen) {
        lines.push(remaining);
        break;
      }

      // Try to break at a space
      let breakPoint = remaining.lastIndexOf(" ", maxLen);
      if (breakPoint <= 0) {
        // No space found, hard break
        breakPoint = maxLen;
      }

      lines.push(remaining.slice(0, breakPoint));
      remaining = remaining.slice(breakPoint).trimStart();
    }

    return lines;
  };

  // Build border strings
  const topBorder = `┌${columnWidths.map((w) => "─".repeat(w + 2)).join("┬")}┐`;
  const headerSep = `├${columnWidths.map((w) => "─".repeat(w + 2)).join("┼")}┤`;
  const rowSep = `├${columnWidths.map((w) => "─".repeat(w + 2)).join("┼")}┤`;
  const bottomBorder = `└${columnWidths.map((w) => "─".repeat(w + 2)).join("┴")}┘`;

  // Build header - wrap if needed
  const headerLines: string[][] = table.headers.map((header, i) => {
    const text = getInlineTokensText(header.children);
    return wrapText(text, columnWidths[i] ?? MIN_COL_WIDTH);
  });

  const maxHeaderLines = Math.max(...headerLines.map((lines) => lines.length), 1);
  const headerRows: string[] = [];

  for (let lineIdx = 0; lineIdx < maxHeaderLines; lineIdx++) {
    const row = `│${headerLines
      .map((lines, colIdx) => {
        const text = lines[lineIdx] ?? "";
        const padded = padCell(
          text,
          columnWidths[colIdx] ?? MIN_COL_WIDTH,
          table.alignments[colIdx] ?? "left"
        );
        return ` ${padded} `;
      })
      .join("│")}│`;
    headerRows.push(row);
  }

  // Build data rows with wrapping
  const dataRowGroups: string[][] = table.rows.map((row) => {
    const cellLines: string[][] = row.map((cell, i) => {
      const text = getInlineTokensText(cell.children);
      return wrapText(text, columnWidths[i] ?? MIN_COL_WIDTH);
    });

    const maxLines = Math.max(...cellLines.map((lines) => lines.length), 1);
    const rowLines: string[] = [];

    for (let lineIdx = 0; lineIdx < maxLines; lineIdx++) {
      const rowStr = `│${cellLines
        .map((lines, colIdx) => {
          const text = lines[lineIdx] ?? "";
          const padded = padCell(
            text,
            columnWidths[colIdx] ?? MIN_COL_WIDTH,
            table.alignments[colIdx] ?? "left"
          );
          return ` ${padded} `;
        })
        .join("│")}│`;
      rowLines.push(rowStr);
    }

    return rowLines;
  });

  return (
    <box
      key={`table-${key}`}
      style={{ flexDirection: "column", marginTop: 1, marginBottom: 1 }}
    >
      <text fg={colors.border2}>{topBorder}</text>
      {headerRows.map((row, i) => (
        <text key={`th-${i}`} fg={colors.primary}>
          {row}
        </text>
      ))}
      <text fg={colors.border2}>{headerSep}</text>
      {dataRowGroups.map((rowLines, rowIdx) => (
        <box key={`tr-${rowIdx}`} style={{ flexDirection: "column" }}>
          {rowLines.map((line, lineIdx) => (
            <text key={`trl-${lineIdx}`} fg={colors.fg2}>
              {line}
            </text>
          ))}
          {rowIdx < dataRowGroups.length - 1 && <text fg={colors.border2}>{rowSep}</text>}
        </box>
      ))}
      <text fg={colors.border2}>{bottomBorder}</text>
    </box>
  );
}

// Helper to get plain text from inline tokens
function getInlineTokensText(tokens: InlineToken[]): string {
  return tokens
    .map((token) => {
      switch (token.type) {
        case "text":
          return token.content;
        case "bold":
        case "italic":
        case "boldItalic":
        case "strikethrough":
        case "highlight":
          return getInlineTokensText(token.children);
        case "code":
          return token.content;
        case "subscript":
        case "superscript":
          return token.content;
        case "link":
          return token.text;
        case "autolink":
          return token.href;
        case "email":
          return token.address;
        case "footnoteRef":
          return `[^${token.id}]`;
        case "emoji":
          return token.emoji;
        default:
          return "";
      }
    })
    .join("");
}

// Helper to pad cell content based on alignment
function padCell(text: string, width: number, align: TableAlignment): string {
  const diff = width - text.length;
  if (diff <= 0) return text.slice(0, width);

  switch (align) {
    case "center": {
      const left = Math.floor(diff / 2);
      const right = diff - left;
      return " ".repeat(left) + text + " ".repeat(right);
    }
    case "right":
      return " ".repeat(diff) + text;
    case "left":
      return text + " ".repeat(diff);
    case "none":
      return text + " ".repeat(diff);
    default:
      return text + " ".repeat(diff);
  }
}

export function MarkdownBlock({ content, colors }: MarkdownBlockProps) {
  const tokens = parseBlocks(content);

  // Filter out consecutive empty lines to avoid excessive spacing
  const filteredTokens = tokens.filter(
    (token, index, arr) =>
      token.type !== "emptyLine" || (index > 0 && arr[index - 1]?.type !== "emptyLine")
  );

  return (
    <box style={{ flexDirection: "column" }}>
      {filteredTokens.map((token, index) => renderBlockToken(token, colors, index))}
    </box>
  );
}
