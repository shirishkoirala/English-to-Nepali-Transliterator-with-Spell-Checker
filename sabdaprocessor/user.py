import os
from final_year_project import settings

def user_dict(ascii, unicode):
    line = 0
    write_to_file = True
    frequency = 1

    line_to_write = ascii.strip() + ' ' + unicode.strip() + ' ' + str(frequency) + '\n'


    file_for_read = open(os.path.join(settings.STATIC_DIR, "user_dict.txt"), "r", encoding="utf8")
    for line_from_file in file_for_read:
        splitted_line_from_file = line_from_file.split(' ')
        if(splitted_line_from_file[0].strip() in ascii.strip() and splitted_line_from_file[1].strip() in unicode.strip()):
            write_to_file = False


    if(write_to_file):
        file_append = open(os.path.join(settings.STATIC_DIR, "user_dict.txt"), "a", encoding="utf8")
        print(line_to_write, end='', file=file_append)
    else:
        file_read = open(os.path.join(settings.STATIC_DIR, "user_dict.txt"), "r", encoding="utf8")
        data_to_write = ''

        for line_from_file in file_read:
            splitted_line_from_file = line_from_file.split(' ')

            if(splitted_line_from_file[0] in ascii.strip() and splitted_line_from_file[1].strip() in unicode.strip()):
                splitted_line_from_file = line_from_file.split(' ')
                frequency = int(splitted_line_from_file[len(splitted_line_from_file) - 1])
                frequency += 1
                data_to_write += ascii.strip() + " " + unicode.strip() + ' ' + str(frequency) + '\n'
            else:
                data_to_write += line_from_file

        file_write = open(os.path.join(settings.STATIC_DIR, "user_dict.txt"), "w", encoding="utf8")
        print(data_to_write, end='', file=file_write)
