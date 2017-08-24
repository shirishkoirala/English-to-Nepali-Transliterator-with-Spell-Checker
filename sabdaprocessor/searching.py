import time
import json
from sabdaprocessor import Transliterator


def main(word, t, start, end):
    data = []

    d = Transliterator.Transliterator(word).combine_tokens()

    for w in d:
        if t.has_word(w+"\n"):
            data.append(w)

    if len(data) <= 0:
        for word_from_transliterator in d:
            data.append(word_from_transliterator)

    return_data = {'results' : data[int(start):int(end)], 'total':len(data)}
    return json.dumps(return_data)

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
