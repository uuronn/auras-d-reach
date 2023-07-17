type Lyrics = {
  title: string;
  lyric: string;
  choices: string[];
};

export const LYRICS: Lyrics[] = [
  {
    title: "ドライフラワー",
    lyric: "気付けば喧嘩ばっかりしてさごめんね",
    choices: ["ドライフラワー", "レオ", "ベテルギウス", "シャッター"]
  },
  {
    title: "ベテルギウス",
    lyric: "まるでそれは僕らみたいに寄り添ってる",
    choices: [
      "アダムとイブ",
      "クリスマスイブ",
      "ヒーローの居ない街",
      "ベテルギウス"
    ]
  },
  {
    title: "かくれんぼ",
    lyric: "文句を言いながら片付けてくれた君は出かけたまま",
    choices: ["スマホウォーズ", "かくれんぼ", "背中", "クリスマスイブ"]
  },
  {
    title: "レオ",
    lyric: "怖かったんだあの日君に連れられるまでは",
    choices: ["恋人じゃなくなった日", "レオ", "うぉ", "ピーターパン"]
  },
  {
    title: "シャッター",
    lyric: "君と見るはずだった花火が 夜の隙間を埋めてく",
    choices: ["メリーゴーランド", "レオ", "告白直前酸欠状態", "夏音"]
  },
  {
    title: "ピーターパン",
    lyric: "黙って見てればいんだ 笑ってそういってやれ",
    choices: ["インフィニティ", "レオ", "ピーターパン", "ヒーローの居ない街"]
  },
  {
    title: "かごめ",
    lyric: "そいつの胸ぐらを掴んで 力のまま殺してやるのさ",
    choices: ["ドライフラワー", "レオ", "かごめ", "シャッター"]
  },
  {
    title: "インフィニティ",
    lyric: "蹴とばした石が転がる 道意地っ張りな君 似てる同士素直になれずに",
    choices: ["インフィニティ", "レオ", "ベテルギウス", "シャッター"]
  },
  {
    title: "桜晴",
    lyric:
      "窓に洗濯物が揺れる どこか懐かしい午後は 母の声が聞こえそうで 胸がいつもより狭くなる",
    choices: ["ドライフラワー", "レオ", "桜晴", "タイムマシン"]
  },
  {
    title: "ミズキリ",
    lyric:
      "恋はどんなことでさえも超えていけると 思える日が来るだなんて思わなくて",
    choices: [
      "ドライフラワー",
      "ミズキリ",
      "ベテルギウス",
      "ガリレオは恋をする"
    ]
  },
  {
    title: "アストロノーツ",
    lyric:
      "ある夜その少年は宇宙へと彼女に別れを告げ人類のために勇敢に飛び立った",
    choices: [
      "インフィニティ",
      "ピーターパン",
      "アストロノーツ",
      "ペテルギウス"
    ]
  },
  {
    title: "アダムとイブ",
    lyric:
      "涙の帰り道でした限界が迫っているようだ誰とも会いたくないのは自分のせいかも",
    choices: ["桜晴", "かくれんぼ", "ミズキリ", "アダムとイブ"]
  },
  {
    title: "うぉ",
    lyric: "言い訳しても仕方がねぇ夢は叶えるためあんの",
    choices: ["おにごっこ", "スマホウォーズ", "うぉ", "タイムマシン"]
  },
  {
    title: "おにごっこ",
    lyric:
      "かくれんぼは君の勝ちで隠せないままこの気持ちは会えてもどう話せばいい",
    choices: ["おにごっこ", "タイムマシン", "かくれんぼ", "ライラ"]
  },
  {
    title: "ガリレオは恋をする",
    lyric: "瞬く星のように私だけが気付いてると思ってた",
    choices: [
      "アストロノーツ",
      "ビリミリオン",
      "インフィニティ",
      "ガリレオは恋をする"
    ]
  },
  {
    title: "クリスマスイブ",
    lyric:
      "もしも君が僕を思い出してくれてたらあの場所に居るんじゃないかって待っていたよ",
    choices: [
      "アダムとイブ",
      "ミザリー",
      "恋人じゃなくなった日",
      "クリスマスイブ"
    ]
  },
  {
    title: "スマホウォーズ",
    lyric:
      "パンドラの箱疑わす魔法惑わされて終わらない議論をしてるシュレーディンガーの猫みたい",
    choices: [
      "スマホウォーズ",
      "タイムマシン",
      "ガリレオは恋をする",
      "ピーターパン"
    ]
  },
  {
    title: "タイムマシン",
    lyric: "虚しい寂しい何かで埋めたい痛みすらも暇つぶしだね",
    choices: ["タイムマシン", "ノンタイトル", "ミザリー", "シャッター"]
  },
  {
    title: "ノンタイトル",
    lyric: "振り向いた時そこにある俺の足跡が全てを物語るだから",
    choices: ["ヒーローの居ない街", "ノンタイトル", "背中", "レオ"]
  },
  {
    title: "ヒーローの居ない街",
    lyric: "だってこんな世界じゃ上手に踊るなんて出来やしないね",
    choices: ["ライラ", "ヒーローの居ない街", "かごめ", "うぉ"]
  },
  {
    title: "ビリミリオン",
    lyric: "ただ起きて食って働いて寝て起きて働く毎日だ",
    choices: ["不言論", "花鳥風月", "ビリミリオン", "かくれんぼ"]
  },
  {
    title: "ミザリー",
    lyric: "道行く全てが不快だった明日を拒む身体を騙して",
    choices: ["恋人じゃなくなった日", "ミザリー", "飛行船", "ベテルギウス"]
  },
  {
    title: "メリーゴーランド",
    lyric: "一人泣いてたバスタブの中顔が痛くて貴方に会いたくて",
    choices: ["ドライフラワー", "ミザリー", "メリーゴーランド", "夏音"]
  },
  {
    title: "ライラ",
    lyric:
      "歌っていたい踊っていたい感情論だけで息して喜怒哀楽失っちゃ人間じゃないぜ",
    choices: ["ライラ", "夏音", "うぉ", "ベテルギウス"]
  },
  {
    title: "不言論",
    lyric:
      "どうしてどうして生きていけない宇宙のはじっこの小さな世界でけなし合ってる",
    choices: ["アストロノーツ", "メリーゴーランド", "おにごっこ", "不言論"]
  },
  {
    title: "告白直前酸欠状態",
    lyric: "さぁ息を吸ったらもう覚悟決めてあぁ口にすれば戻れないよ",
    choices: ["夏音", "不言論", "ガリレオは恋をする", "告白直前酸欠状態"]
  },
  {
    title: "夏音",
    lyric:
      "退屈を持て余してくすぐったり背中を寄せたり何もなくても構わないさただ君がそこに居るなら",
    choices: ["ヒーローの居ない街", "夏音", "かくれんぼ", "タイムマシン"]
  },
  {
    title: "恋人じゃなくなった日",
    lyric: "もうこれ以上記念日は増えないんだね",
    choices: ["ミザリー", "ノンタイトル", "桜晴", "恋人じゃなくなった日"]
  },
  {
    title: "背中",
    lyric: "何もしないで眺めてるだけじゃ正解はないぜ",
    choices: ["背中", "メリーゴーランド", "タイムマシン", "シャッター"]
  },
  {
    title: "花鳥風月",
    lyric: "甘ったれてるそのまにまに奪われていくもの横目に",
    choices: ["告白直前酸欠状態", "夏音", "花鳥風月", "飛行船"]
  },
  {
    title: "飛行船",
    lyric: "深い青に潜って探していたあの日の誓いを君は覚えている？",
    choices: ["不言論", "桜晴", "飛行船", "インフィニティ"]
  }
];

export const PLAYERS = ["PLAYER1", "PLAYER2", "PLAYER3", "AAAAAAAA1", "AAA2"];

export const titles = ["ドライフラワー", "ペテルギウス", "かくれんぼ", "レオ"];
