import time
import os
import json
from sabdaprocessor import Transliterator
from final_year_project import settings


def main(word):
    data = []
    file_set = set(line.strip() for line in open(os.path.join(settings.STATIC_DIR,"ne_NP_new.dic"), "r", encoding="utf8"))

    d = Transliterator.Transliterator(word).combine_tokens()

    for w in d:
        if w in file_set:
            data.append(w)

    return json.dumps(data)

def transliterate(word):
    return json.dumps(Transliterator.Transliterator(word).get_filtered_combinations())
