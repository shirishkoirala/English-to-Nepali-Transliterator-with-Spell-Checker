import itertools
import time
import re


class Transliterator:
    _d = dict()
    _d["a"] = ("अ", "आ", "ए", "ा")
    _d["b"] = ("ब्", "ब", "भ्", "भ", "व्", "व")
    _d["c"] = ("च्", "छ्", "क्ष्", "च", "छ", "क्ष", "क्", "क")
    _d["d"] = ("ड्", "ढ्", "द्", "घ्", "ड", "ढ", "द", "घ")
    _d["e"] = ("इ", "ए", "े")
    _d["f"] = ("फ्", "फ")
    _d["g"] = ("ग्", "घ्", "ज्ञ्", "ग", "घ", "ज्ञ")
    _d["h"] = ("ह्", "ह", "ः")
    _d["i"] = ("इ", "ई", "ि", "ी")
    _d["j"] = ("ज्", "झ्", "ज", "झ")
    _d["k"] = ("क्", "ख्", "क", "ख",)
    _d["l"] = ("ल्", "ल")
    _d["m"] = ("म्", "म", "ं")
    _d["n"] = ("न्", "ण्", "न", "ण", "ँ", "ङ", "ङ्")
    _d["o"] = ("ओ", "ो")
    _d["p"] = ("फ्", "प्", "फ", "प")
    _d["q"] = ("क्", "क")
    _d["r"] = ("र्", "ृ", "र")
    _d["s"] = ("श्", "ष्", "स्", "श", "ष", "स")
    _d["t"] = ("ट्", "ठ्", "ट", "ठ", "त", "त्", "थ", "थ्")
    _d["u"] = ("उ", "ऊ", "ू", "ु", "ै")
    _d["v"] = ("भ्", "भ")
    _d["w"] = ("व्", "व")
    _d["x"] = ("छ्", "छ", "क्ष्", "क्ष")
    _d["y"] = ("य्", "य", "ी", "ञ", "ञ्")
    _d["z"] = ("ज्", "ज")

    _d["."] = ("।",)
    _d[" "] = (" ",)

    _d["aa"] = ("आ", "ा")
    _d["ae"] = ("ए", "े")
    _d["aei"] = ("ऐ",)
    _d["ai"] = ("ऐ",)
    _d["au"] = ("औ", "ौ")
    _d["ou"] = ("औ", "ौ")
    _d["am"] = ("अं", "ं")
    _d["ah"] = ("अः", "ः")
    _d["ue"] = ("ु",)
    _d["oo"] = ("ऊ", "ू")
    _d["ee"] = ("ई", "ी")
    _d["ii"] = ("ई",)
    _d["oau"] = ("औ",)
    _d["ka"] = ("क", "का")
    _d["kh"] = ("ख", "ख्")
    _d["kha"] = ("ख", "खा")
    _d["ga"] = ("ग", "गा")
    _d["gh"] = ("घ", "घ्")
    _d["gha"] = ("घ", "घा")
    _d["ng"] = ("ङ", "ङ्", "ँ")
    _d["nga"] = ("ङ", "ँ")
    _d["ca"] = ("च", "चा")
    _d["ch"] = ("छ", "छ्")
    _d["cha"] = ("छ", "छा")
    _d["xa"] = ("छ", "छा")
    _d["ja"] = ("ज", "जा")
    _d["za"] = ("ज", "जा")
    _d["jh"] = ("झ", "झ्")
    _d["jha"] = ("झ", "झा")
    _d["zha"] = ("झ", "झा")
    _d["zh"] = ("झ", "झ्")
    _d["ny"] = ("ञ",)
    _d["yna"] = ("ञ", "ञा")
    _d["yn"] = ("ञ", "ञ्")
    _d["ta"] = ("ट", "त", "ता")
    _d["th"] = ("ठ", "थ", "ठ्", "थ्")
    _d["tha"] = ("ठ", "थ", "था")
    _d["da"] = ("द", "ड", "दा", "डा")
    _d["dh"] = ("ढ", "ध", "ढ्", "ध्")
    _d["dha"] = ("ढ", "ध", "धा")
    _d["tta"] = "ट"
    _d["na"] = ("ण", "न", "ना", "णा")
    _d["pa"] = ("प", "पा")
    _d["fa"] = ("फ", "फा")
    _d["ph"] = ("फ", "फ्")
    _d["pha"] = ("फ", "फा")
    _d["ba"] = ("ब", "बा")
    _d["bh"] = ("भ", "भ्")
    _d["bha"] = ("भ", "भा")
    _d["va"] = ("भ", "भा")
    _d["vha"] = ("भ", "भा")
    _d["vh"] = ("भ", "भ्")
    _d["ma"] = ("म", "मा")
    _d["ya"] = ("य", "या")
    _d["ra"] = ("र", "रा")
    _d["rra"] = ("र", "रा")
    _d["la"] = ("ल", "ला")
    _d["wa"] = ("व", "वा")
    _d["sha"] = ("श", "शा")
    _d["sh"] = ("श", "स", "ष", "श्", "स्", "ष्")
    _d["ssa"] = ("श", "स", "ष", "शा", "सा", "षा")
    _d["ssha"] = ("ष", "षा")
    _d["ha"] = ("ह", "हा")
    _d["ksha"] = ("क्ष", "क्षा")
    _d["ksh"] = ("क्ष", "क्ष्")
    _d["tr"] = ("त्र", "त्र्")
    _d["tra"] = ("त्र", "त्रा")
    _d["gy"] = ("ज्ञ", "ज्ञ्")
    _d["gya"] = ("ज्ञ", "ज्ञा")
    _d["co"] = ("क")

    def __init__(self, word):
        self._word = word

    def tockenize(self):
        self._word += " "
        temp = ""
        i = 0
        while i < len(self._word):
            temp2 = temp
            temp += self._word[i]
            if temp not in self._d:
                yield temp2
                temp = ""
                i -= 1
            i += 1

    def get_tokens(self):
        tokens = []
        for n in self.tockenize():
            tokens.append(self._d[n])
        return tokens

    def combine_tokens(self):
        return self.combine(self.get_tokens())

    def combine(self, d):
        temp = []
        if len(d) <= 1:
            for x in d[0]:
                temp.append(x)
            return temp

        i = 0

        while i < (len(d) - 1):
            if len(temp) <= 0:
                temp = d[i]
                continue
            temp = [''.join(x) for x in itertools.product(temp, d[i + 1])]
            i += 1
        return temp

    def get_filtered_combinations(self):
        return_value = []
        pattern = re.compile('[्][्ौेँूुःीैंि]')
        temp = self.combine(self.get_tokens())
        for i, n in enumerate(temp):
            match = re.search(pattern, n)
            if not match:
                return_value.append(n)
        return return_value

    def display(self):
        for i, word in enumerate(self.combine_tokens()):
            print(i, word)

    def display_tokens(self):
        for i, t in enumerate(self.tockenize()):
            print(i, t, self._d[t])
