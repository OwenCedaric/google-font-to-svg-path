export interface UseCaseData {
  slug: string;
  badgeEn: string;
  badgeZh: string;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  seoTitleEn: string;
  seoTitleZh: string;
  seoDescriptionEn: string;
  seoDescriptionZh: string;
  initialFont: string;
  initialText: string;
  initialUnion: boolean;
  initialDxfUnits?: string;
  initialFilled?: boolean;
  whyTitleEn: string;
  whyTitleZh: string;
  whyContentEn: string;
  whyContentZh: string;
  features: {
    icon: string;
    titleEn: string;
    titleZh: string;
    descEn: string;
    descZh: string;
  }[];
  steps: {
    titleEn: string;
    titleZh: string;
    descEn: string;
    descZh: string;
  }[];
  faq: {
    qEn: string;
    qZh: string;
    aEn: string;
    aZh: string;
  }[];
}

export const USE_CASES: Record<string, UseCaseData> = {
  'cricut-font-welder': {
    slug: 'cricut-font-welder',
    badgeEn: 'Cricut & Vinyl Silhouette Essential',
    badgeZh: 'Cricut & 刻字机手作必备',
    titleEn: 'Online Cursive Font Welder for Cricut & Vinyl Cutters',
    titleZh: '在线草书连笔焊接工具 (专为 Cricut 与刻字机打造)',
    subtitleEn: 'Merge overlapping cursive scripts into unified single-cut outlines using browser-based boolean union. Zero overlapping cut lines, zero ruined materials.',
    subtitleZh: '通过纯浏览器布尔合并（Union）自动消除草书笔画交叉线，生成单一平滑切割闭合外轮廓，彻底告别刻烂材料。',
    seoTitleEn: 'Free Online Cursive Font Welder for Cricut & Silhouette | FontSVG',
    seoTitleZh: 'Cricut 草书连笔自动焊接工具 - 免费在线文字布尔合并转 SVG | FontSVG',
    seoDescriptionEn: 'Free online cursive font welder for Cricut Design Space and Silhouette Studio. Weld overlapping letter outlines into seamless SVG cut files directly in your browser.',
    seoDescriptionZh: '专为 Cricut 与刻字机设计的免费在线草书焊接工具。自动合并连笔字笔画交叉重叠，导出无缝切割 SVG 轮廓，无需安装 Illustrator。',
    initialFont: 'Pacifico',
    initialText: 'Handmade with Love',
    initialUnion: true,
    initialFilled: false,
    whyTitleEn: 'Why You Must Weld Cursive Fonts for Cricut Cutting',
    whyTitleZh: '为什么 Cricut 刻字前必须对连笔字进行“焊接 (Weld)”？',
    whyContentEn: 'In cursive and script typefaces, adjacent characters intentionally overlap so words look connected. However, vinyl plotters and laser cutters follow every vector outline literally. Without boolean welding, the blade will cut inside the overlapping letter joints, cutting your delicate cursive words into useless shredded fragments.',
    whyContentZh: '在英文草书、花体字和连笔手写体中，相邻字母的笔触是互相交叠的。如果直接导出给 Cricut、Silhouette 刻字机或激光雕刻机，刀头或激光束会沿着每条原始路径切割，导致连笔交叉处被直接切断，昂贵的压纹胶膜或木料瞬间报废。FontSVG 在浏览器端实时完成布尔联集，一秒生成连贯闭合外框。',
    features: [
      {
        icon: 'ri-shape-line',
        titleEn: 'Automatic Boolean Union',
        titleZh: '全自动布尔合并 (Union)',
        descEn: 'Maker.js geometric union calculates continuous contour boundaries, removing all internal overlapping stroke lines.',
        descZh: '利用 Maker.js 几何引擎精确计算交集并消除内线，只保留最平滑的单一外切割线。',
      },
      {
        icon: 'ri-file-code-line',
        titleEn: 'Direct Cricut SVG Export',
        titleZh: '完美兼容 Cricut Design Space',
        descEn: 'Export clean SVG files with no hidden clipping paths or raster embeds. Ready to import straight into Cricut Design Space.',
        descZh: '导出纯净标准矢量 SVG，无隐藏剪裁蒙版或位图杂质，拖入 Cricut 软件即可直接开始切割。',
      },
      {
        icon: 'ri-google-fill',
        titleEn: '1,500+ Google Fonts Built-in',
        titleZh: '内置 1,500+ 款免费商用字体',
        descEn: 'Instantly preview scripts like Pacifico, Dancing Script, and Great Vibes without downloading or installing font files on your PC.',
        descZh: '无需在电脑里安装大量字体，直接在网页上即时挑选、预览并焊接热门连笔字形。',
      },
      {
        icon: 'ri-shield-check-line',
        titleEn: 'Upload Custom OTF / TTF',
        titleZh: '支持本地付费字体上传',
        descEn: 'Bought a font from Etsy or Creative Market? Upload and weld it 100% privately in your browser without uploading to any server.',
        descZh: '在 Etsy 或商用字体站购买的私人字体文件，可直接拖入解析，零上传至服务器，完全安全合规。',
      },
    ],
    steps: [
      {
        titleEn: 'Choose a Script Font',
        titleZh: '选择连笔草书字体',
        descEn: 'Select any cursive font like Pacifico or Great Vibes from Google Fonts, or upload your purchased .ttf/.otf font file.',
        descZh: '在字体面板选择 Pacifico、Dancing Script 等连笔字，或上传本地下载的专属花体字文件。',
      },
      {
        titleEn: 'Type Your Craft Text',
        titleZh: '输入定制标语文字',
        descEn: 'Type your phrases (e.g. bride names, holiday greetings). Adjust kerning if letters need to overlap tighter.',
        descZh: '输入新人姓名、节日祝福语或品牌口号，微调字号和字距微调（Kerning）使笔画自然连接。',
      },
      {
        titleEn: 'Toggle Union Checkbox',
        titleZh: '确认开启“合并重叠路径 (Union)”',
        descEn: 'The tool instantly welds intersecting glyph outlines into one seamless continuous vector cutting outline.',
        descZh: '右侧面板确保勾选“合并重叠路径 (Union)”，系统会瞬间自动熔接所有笔触交叉点。',
      },
      {
        titleEn: 'Download SVG for Cutting',
        titleZh: '下载 SVG 导入刻字机',
        descEn: 'Click "Download SVG" and upload the clean file into Cricut Design Space or Silhouette Studio to cut flawlessly.',
        descZh: '点击“下载 SVG”，直接载入 Cricut Design Space 或 Silhouette 软件开始切割。',
      },
    ],
    faq: [
      {
        qEn: 'Do I need Adobe Illustrator to weld cursive text?',
        qZh: '我还需要花钱买 Adobe Illustrator 来做文字焊接联集吗？',
        aEn: 'No! FontSVG performs the exact same mathematical boolean union (Pathfinder Weld) completely free in your browser with zero installation.',
        aZh: '完全不需要！FontSVG 在浏览器端利用几何布尔运算实现了与 Illustrator 路径查找器“联集（Unite/Weld）”完全相同的算法，完全免费且免安装。',
      },
      {
        qEn: 'Why do my cursive letters still cut separately in Cricut?',
        qZh: '为什么我在有些软件导出的草书导入 Cricut 依然会被切碎？',
        aEn: 'Most online converters merely wrap characters in <text> tags without converting them to outlines, leaving overlapping strokes raw. FontSVG extracts actual glyph bezier outlines and calculates boolean unions.',
        aZh: '大多数普通在线转换器只是把文字包在 <text> 标签里，根本没有将文字转曲并做布尔计算。FontSVG 会解析出真实的贝塞尔轮廓线并在交叉处做几何融接。',
      },
      {
        qEn: 'Can I upload custom fonts purchased on Creative Market or Etsy?',
        qZh: '我在 Etsy 或第三方网站购买的商用花体字可以上传使用吗？',
        aEn: 'Yes! Simply click "Choose .ttf / .otf file" in the font panel. Parsing is 100% client-side, so your proprietary font file is never uploaded or leaked.',
        aZh: '完全可以！点击右侧“选择本地字体文件”即可加载。所有解析均在浏览器本地离线完成，字体文件绝不离网，百分百保障版权安全。',
      },
    ],
  },

  'laser-cutting-text-to-dxf': {
    slug: 'laser-cutting-text-to-dxf',
    badgeEn: 'CAD, CAM, Laser & CNC Machining',
    badgeZh: '激光切割、数控 CNC 与 CAD 工程必备',
    titleEn: 'Text to DXF Converter for Laser Cutters & CNC Routers',
    titleZh: '文字转 CAD DXF 矢量生成器 (适配 LightBurn 与 CNC 雕刻)',
    subtitleEn: 'Convert Google Fonts and local desktop fonts into Autodesk DXF files with real physical dimension units (mm, cm, inches). Ready for LightBurn, LaserCAD, and Fusion 360.',
    subtitleZh: '将 Google 在线字体与本地字体转换为带有真实毫米/英寸物理尺寸单位的 Autodesk DXF 图纸，即导即切，完美兼容主流数控加工软件。',
    seoTitleEn: 'Text to DXF Converter for Laser Cutting & CNC (mm / inches) | FontSVG',
    seoTitleZh: '文字转 DXF 转换器 - 激光切割与 CNC 雕刻矢量图纸生成 (支持毫米/英寸) | FontSVG',
    seoDescriptionEn: 'Free online text to DXF converter with mm and inch physical units. Generate clean continuous polyline DXF drawings for LightBurn, LaserCAD, Fusion 360, and CNC routers.',
    seoDescriptionZh: '免费在线文字转 CAD DXF 工具。支持设置毫米、厘米和英寸等真实物理单位，生成干净的 POLYLINE 切割闭合轮廓，无缝对接 LightBurn、LaserCAD 与数控机床。',
    initialFont: 'Bebas Neue',
    initialText: 'LASER CUT',
    initialUnion: true,
    initialDxfUnits: 'mm',
    initialFilled: false,
    whyTitleEn: 'Why Direct DXF Export with Physical Units Matters',
    whyTitleZh: '为什么带有真实物理尺寸（mm / inch）的 DXF 导出如此关键？',
    whyContentEn: 'CNC milling and industrial laser systems do not work with vague web pixels; they operate on precise physical dimensions (millimeters, inches). Exporting generic SVGs often leads to scaling ambiguity in CAM software. FontSVG exports native Autodesk DXF drawings structured with POLYLINE entities and calibrated physical unit headers.',
    whyContentZh: '工业级光纤激光切割机、CO2 雕刻机和数控雕刻机（CNC）不使用网页端的模糊“像素（px）”，而是严格依赖毫米（mm）或英寸（inch）等物理尺度。普通矢量转换器导出的文件导入 CAM 软件常常尺寸失真。FontSVG 导出正规 Autodesk DXF 图纸，带有标准的头部单位定义与 POLYLINE 多段线，确保所见即所得。',
    features: [
      {
        icon: 'ri-ruler-2-line',
        titleEn: 'Physical Units (mm, cm, m, inch, foot)',
        titleZh: '毫米 / 英寸等 5 种真实物理单位',
        descEn: 'Choose exact physical units for CAD export so your text outline imports at 1:1 scale in LightBurn and AutoCAD.',
        descZh: '导出时指定物理尺寸单位（mm、cm、inch 等），导入 AutoCAD、LightBurn 时 1:1 还原尺寸无偏差。',
      },
      {
        icon: 'ri-crosshair-2-line',
        titleEn: 'Optimized Polyline Approximation',
        titleZh: '优化多段线 (POLYLINE) 结构',
        descEn: 'Generates clean continuous closed polylines, minimizing CNC head jumps and ensuring silky smooth toolpaths.',
        descZh: '采用优化的闭合多段线结构，极大减少机床空程抬刀次数，切割刀路平滑无毛刺。',
      },
      {
        icon: 'ri-box-3-line',
        titleEn: 'LightBurn & LaserCAD Ready',
        titleZh: '完美兼容主流激光控制软件',
        descEn: 'Directly verified for LightBurn, LaserCAD, RDWorks, Fusion 360, SolidWorks, and Vectric Aspire.',
        descZh: '经过 LightBurn、RDWorks、LaserCAD、Fusion 360、SolidWorks 实测验证，免去二次描摹转格式。',
      },
      {
        icon: 'ri-text-spacing',
        titleEn: 'Stencil & Bold Display Fonts',
        titleZh: '内置工业粗体与镂空喷漆字体',
        descEn: 'Choose from industrial fonts like Bebas Neue, Black Ops One, and Anton to prevent laser cut interior fallouts.',
        descZh: '内置 Bebas Neue、Black Ops One（防掉心镂空字）、Anton 等重型粗体，切割结构牢固不易变形。',
      },
    ],
    steps: [
      {
        titleEn: 'Pick an Industrial or Custom Font',
        titleZh: '选择工业或本地镂空字体',
        descEn: 'Select a bold display font from Google Fonts or upload your company’s specialized laser stencil font.',
        descZh: '在字体库中选择粗体或连笔字，也可以直接载入公司现有的镂空字或工程专用字体。',
      },
      {
        titleEn: 'Type Dimensions & Text',
        titleZh: '输入加工内容与排版',
        descEn: 'Type machine plate texts, serial numbers, or decorative wordings. Configure size and line spacing.',
        descZh: '输入铭牌内容、零件编号或定制标语，调整字号大小与多行排版间距。',
      },
      {
        titleEn: 'Set DXF Physical Units',
        titleZh: '配置 DXF 物理导出单位',
        descEn: 'In settings, pick "mm" for metric laser cutters or "inch" for imperial CNC setups.',
        descZh: '在右侧面板的“DXF 导出设置”中，根据加工要求选择“mm”（毫米）或“inch”（英寸）。',
      },
      {
        titleEn: 'Click Download DXF',
        titleZh: '一键导出 CAD DXF 图纸',
        descEn: 'Save the .dxf file and open directly in LightBurn, Fusion 360, or CAM software to generate G-code.',
        descZh: '点击“DXF”下载按钮，将 .dxf 文件直接拖入 LightBurn 或 CAM 软件一键生成加工 G 代码。',
      },
    ],
    faq: [
      {
        qEn: 'Can I import the DXF directly into LightBurn?',
        qZh: '导出的 DXF 文件能否直接导入 LightBurn 或 RDWorks？',
        aEn: 'Yes! The DXF files exported by FontSVG use standard AutoCAD R12 polyline formatting, which opens flawlessly across all major laser cutting software.',
        aZh: '完全可以！FontSVG 导出的 DXF 文件遵循标准 AutoCAD 实体规范，在 LightBurn、RDWorks、LaserCAD 中直接开箱即用。',
      },
      {
        qEn: 'Does the tool prevent "falling out" centers in letters like A, B, O?',
        qZh: '激光切割类似 A、B、O 字母时，如何防止中间实心部分掉落？',
        aEn: 'We recommend selecting stencil fonts such as "Black Ops One" from our font catalog, or uploading your custom bridge/stencil font file.',
        aZh: '为了防止“掉心”，建议在字体库中选择自带桥连结构的喷漆模板字（如 Black Ops One），或者直接上传您的防掉心工程字体。',
      },
      {
        qEn: 'Is there a file size limit for uploaded custom DXF fonts?',
        qZh: '上传本地字体转换 DXF 有没有文件大小限制？',
        aEn: 'No strict limit! Since all processing happens in your browser’s local memory using WebAssembly and OpenType.js, even large 30MB CJK font files can be parsed instantly.',
        aZh: '没有严格限制！因为所有计算都在您电脑的浏览器本地完成，即使 20~30MB 的超大中文字库也能在几百毫秒内解析完成。',
      },
    ],
  },

  'text-to-svg-path-react': {
    slug: 'text-to-svg-path-react',
    badgeEn: 'Frontend, WebGL & UI Component Generator',
    badgeZh: '前端开发、Three.js & 矢量 UI 组件利器',
    titleEn: 'Text to SVG Path Converter for React, Vue & Three.js',
    titleZh: '文字转纯净 SVG 路径提取器 (专为 React、Vue 与 Three.js 打造)',
    subtitleEn: 'Convert Google Fonts to raw vector <path d="..."> strings. Eliminate 3MB web font download payloads for static logos, hero headlines, and WebGL extrusions.',
    subtitleZh: '将 Google 字体转为轻量级纯矢量 <path d="..."> 数据。为静态 Logo、首屏大标题和 Three.js 3D 文字彻底去除几十 MB 的网络字体包加载开销。',
    seoTitleEn: 'Text to SVG Path Generator for React, Vue & Three.js | FontSVG',
    seoTitleZh: '文字转 SVG 路径代码生成器 - 提取纯净 <path d> 适配 React 与 3D 渲染 | FontSVG',
    seoDescriptionEn: 'Extract raw vector <path d="..."> strings from Google Fonts and local TTF files for React JSX, Vue, Canvas, and Three.js. Zero runtime font dependencies.',
    seoDescriptionZh: '将 Google 在线字体与本地 TTF 快速提取为纯净的矢量 <path d="..."> 字符串。免去字体包下载，适合 React JSX 图标、Tailwind 组件与 Three.js 3D 挤压。',
    initialFont: 'Inter',
    initialText: 'VECTOR',
    initialUnion: false,
    initialFilled: true,
    whyTitleEn: 'Why Inline SVG Paths Beat Web Fonts for Logos & Icons',
    whyTitleZh: '为什么静态 Logo 与首屏标题用 SVG Path 远优于加载 WebFont？',
    whyContentEn: 'Loading an entire 2MB to 30MB WOFF2 font file just to display a few brand letters on a landing page destroys Google Core Web Vitals (LCP & CLS). By vectorizing your typography into pure <path d="..."> strings, you get 100% sharp vectors with zero font network requests and zero layout shift.',
    whyContentZh: '为了在网站展示几个 Logo 字母或一句 Slogan，常常需要让访客下载 2MB~30MB 的 WebFont 字体包，这会严重拖慢页面加载速度并拉低 Google Core Web Vitals（LCP 变慢、产生 CLS 布局偏移）。通过将文字提取为纯净的 <path d="...">，不仅体积缩小至几 KB，且零网络请求、零渲染阻塞、完美内联。',
    features: [
      {
        icon: 'ri-code-box-line',
        titleEn: 'One-Click Raw Path Clipboard Copy',
        titleZh: '一键复制纯净 <path d="..."> 字符串',
        descEn: 'Instantly copy raw path data or formatted React JSX elements ready to paste directly into your modern frontend stack.',
        descZh: '一键复制无冗余的纯路径数据，直接粘贴到 React JSX、Vue Template 或 Tailwind 矢量组件中。',
      },
      {
        icon: 'ri-flashlight-line',
        titleEn: 'Zero Runtime Font Payload',
        titleZh: '零运行时依赖与首屏瞬开',
        descEn: 'Say goodbye to FOUT (flash of unstyled text) and slow CDN roundtrips. Sharp scalable vector typography that loads instantly.',
        descZh: '告别字体未加载完成时的白屏或闪烁（FOUT/FOIT），纯静态矢量数据毫秒级呈现。',
      },
      {
        icon: 'ri-compasses-line',
        titleEn: 'Ready for Three.js & WebGL Extrusion',
        titleZh: '适配 Three.js 3D 挤压与 Canvas',
        descEn: 'Feed raw SVG path coordinates directly into SVGLoader or ExtrudeGeometry in Three.js and WebGL engines.',
        descZh: '直接将路径数据喂入 Three.js 的 SVGLoader 或 ExtrudeGeometry，无需在前端重载 3D 专用 JSON 字体。',
      },
      {
        icon: 'ri-terminal-box-line',
        titleEn: 'CLI, REST API & Agent Skill',
        titleZh: '提供 CLI、本地 API 与 AI Agent 技能',
        descEn: 'Integrate font-to-svg in your CI/CD pipelines, run scripts with our Node.js CLI, or let AI coding agents invoke our built-in skill.',
        descZh: '支持 `font-to-svg` 命令行、本地 REST 服务与 Antigravity AI Agent 自动化集成。',
      },
    ],
    steps: [
      {
        titleEn: 'Select Typeface & Weight',
        titleZh: '选择无衬线/展示字体与字重',
        descEn: 'Search for Inter, Montserrat, Roboto, or upload your proprietary corporate brand font file.',
        descZh: '搜索 Inter、Montserrat、Poppins 等现代无衬线字体，或拖入企业专有品牌字。',
      },
      {
        titleEn: 'Type Brand Text or Slogan',
        titleZh: '输入品牌 Logo 或标语文本',
        descEn: 'Type the exact characters needed for your UI. Adjust bezier approximation accuracy if file size is critical.',
        descZh: '输入需要制作矢量的文字，支持调整贝塞尔采样精度（Bezier Accuracy）以达到极限代码体积压缩。',
      },
      {
        titleEn: 'Switch to Code Tab',
        titleZh: '切换至“代码 (Code)”面板',
        descEn: 'Preview the generated SVG markup or inspect the raw SVG path coordinates in real time.',
        descZh: '点击右上角“代码 (Code)”标签，实时查看生成的洁净 SVG 标签与封闭路径。',
      },
      {
        titleEn: 'Copy Code into JSX / Template',
        titleZh: '复制代码粘贴至前端组件',
        descEn: 'Click "Copy SVG" and embed the path directly into your React, Vue, Svelte, or Three.js code.',
        descZh: '点击“复制 SVG 路径”，直接粘贴进 React 组件内，享受丝滑高性能渲染。',
      },
    ],
    faq: [
      {
        qEn: 'How does inlining SVG paths improve Google Core Web Vitals?',
        qZh: '将文字内联为 SVG Path 如何提升 Google Core Web Vitals 评分？',
        aEn: 'Web fonts require DNS lookups, font file downloads, and layout reflows, hurting LCP and CLS. Inlining SVG paths removes all network latency, allowing instant above-the-fold paint.',
        aZh: '下载远程字体必须经历 DNS 解析、下载等待与重排，严重拉低 LCP 指标并导致页面跳动（CLS）。内联 SVG Path 没有任何网络等待，首屏瞬间绘制完成。',
      },
      {
        qEn: 'Can I use this for Three.js 3D text generation?',
        qZh: '提取的路径能否直接用于 Three.js 3D 场景？',
        aEn: 'Yes! You can load the generated SVG into Three.js using SVGLoader, and convert the paths into 3D meshes using ExtrudeGeometry with zero client-side opentype parsing overhead.',
        aZh: '非常适合！在 Three.js 中通过 SVGLoader 解析此 SVG，配合 ExtrudeGeometry 即可直接挤压出平滑的 3D 立体模型，无需在客户端再加载沉重的字体解析库。',
      },
      {
        qEn: 'Does FontSVG have an automated CLI for build pipelines?',
        qZh: '是否提供可以在 CI/CD 自动构建流程中调用的命令行工具？',
        aEn: 'Yes! The project includes a Node.js CLI (`node bin/font-to-svg.mjs --text "Logo" --font "Roboto" --format path`) and an Antigravity Agent Skill.',
        aZh: '是的！本项目自带命令行工具（`node bin/font-to-svg.mjs --text "Logo" --font "Roboto" --format path`）以及完整的 Node SDK 与 Agent Skill。',
      },
    ],
  },
};
