# Stockprices alias commands

# clean: remove all converted csv files
clean:
	rm -rvf *_new.csv

# index: re-generate all csv files on index data
index:
	python3 ./dataconverter.py normal ixic.csv
	python3 ./dataconverter.py normal gspc.csv
	python3 ./dataconverter.py normal djia.csv