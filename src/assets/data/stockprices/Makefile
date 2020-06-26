# Stockprices alias commands

# clean: remove all converted csv files
clean:
	rm -rvf *_new.csv

# index: re-generate all csv files on index data
index:
	python3 ./dataconverter.py normal ixic.csv
	python3 ./dataconverter.py normal gspc.csv
	python3 ./dataconverter.py normal djia.csv

# tech: re-generate all csv files on tech stock price data
tech:
	python3 ./dataconverter.py normal fb.csv
	python3 ./dataconverter.py normal googl.csv
	python3 ./dataconverter.py normal amzn.csv
	python3 ./dataconverter.py normal msft.csv
	python3 ./dataconverter.py normal aapl.csv

# all: re-generates all csv files
all:
	python3 ./dataconverter.py normal ixic.csv
	python3 ./dataconverter.py normal gspc.csv
	python3 ./dataconverter.py normal djia.csv
	python3 ./dataconverter.py normal fb.csv
	python3 ./dataconverter.py normal googl.csv
	python3 ./dataconverter.py normal amzn.csv
	python3 ./dataconverter.py normal msft.csv
	python3 ./dataconverter.py normal aapl.csv