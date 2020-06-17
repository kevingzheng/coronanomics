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
                # Y-m-d
                # 06/12/1990
                result = ""
                result += rows[0][6:10]
                result += '-'
                result += rows[0][:2]
                result += '-'
                result += rows[0][3:5]
                outfile.write(result + ',' + rows[1][1:] + '\n')

if __name__ == "__main__":
    main()