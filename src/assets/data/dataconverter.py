import csv
import sys

def main():
    f = open(sys.argv[1][:-4] + '_new.csv', "w")
    f.write("data, value\n")

    with open(sys.argv[1], mode='r') as infile:
        reader = csv.reader(infile)

        with open('SPY_1yr_new.csv', mode='a') as outfile:
            # writer = csv.writer(outfile)
            for rows in reader:
                outfile.write(rows[0] + ',' + rows[1] + '\n')

if __name__ == "__main__":
    main()