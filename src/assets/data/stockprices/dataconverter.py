import csv
import sys


# How to use this file: 
# Run:
#    $ python ./dataconverter.py [dashes | slashes] input_file.csv
# The input file must be in a format similar to that of SPY_1yr.csv, with month-day-year
def main():
    if sys.argv[1] == "dashes":
        dashes("-")
    elif sys.argv[1] == "slashes":
        dashes("/")
    else:
        print("Error: script mode not recognized. Please use the script as follows: \n")
        print("python dataconverter.py [dashes | slashes] input_file.csv")

def dashes(inputchar):
    of = open(sys.argv[2][:-4] + '_new.csv', "a")
    of.write("date,value\n")

    with open(sys.argv[2], mode='r') as infile:
        reader = csv.reader(infile)

        with of as outfile:
            # writer = csv.writer(outfile)
            counter = 0
            for rows in reader:
                if counter != 0:
                    result = ""
                    result += rows[0][6:10]
                    result += inputchar
                    result += rows[0][:2]
                    result += inputchar
                    result += rows[0][3:5]
                    outfile.write(result + ',' + rows[1][1:] + '\n')
                else:
                    counter = 1

if __name__ == "__main__":
    main()