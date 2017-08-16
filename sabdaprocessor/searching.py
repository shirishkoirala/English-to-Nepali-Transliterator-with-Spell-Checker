import time
import os
import json
from sabdaprocessor import Transliterator
from final_year_project import settings
from sabdaprocessor import tries


def main(word):
    data = []
    # file_set = set(line.strip() for line in open(os.path.join(settings.STATIC_DIR, "ne_NP_new.dic"), "r", encoding="utf8"))
    #
    # d = Transliterator.Transliterator(word).combine_tokens()
    #
    # for w in d:
    #     if w in file_set:
    #         data.append(w)
    t = tries.Trie()
    for line in open(os.path.join(settings.STATIC_DIR, "ne_NP_new.dic"), "r", encoding="utf8"):
        t.add(line)

    d = Transliterator.Transliterator(word).combine_tokens()

    for w in d:
        if t.has_word(w+"\n"):
            data.append(w)

    if len(data) <= 0:
        for i in Transliterator.Transliterator._d.get(word[0]):
            for word_from_trie in t.start_with_prefix(i):
                for word_from_dict in d:
                    if ld(word_from_dict, word_from_trie) <= 1:
                        data.append(word_from_dict)

    return json.dumps(data)

def transliterate(word):
    return json.dumps(Transliterator.Transliterator(word).get_filtered_combinations())

def ld(s, t):
    s = ' ' + s
    t = ' ' + t
    d = {}
    for i in range(len(s)):
        d[i, 0] = i
    for j in range(len(t)):
        d[0, j] = j
    for j in range(1, len(t)):
        for i in range(1, len(s)):
            if s[i] == t[j]:
                d[i, j] = d[i - 1, j - 1]
            else:
                d[i, j] = min(d[i - 1, j], d[i, j - 1], d[i - 1, j - 1]) + 1
    return d[len(s) - 1, len(t) - 1]
