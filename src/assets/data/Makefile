# CSV separater file
# Pratheek Hegde
EXECUTABLE = csvconvert
CXX = g++
CFLAGS = -std=c++1z -Wconversion -Wall -Werror -Wextra -pedantic -O3 -DNDEBUG

$(EXECUTABLE): csvconvert.cpp
	$(CXX) $(CFLAGS) csvconvert.cpp -o $(EXECUTABLE).exe

clean: 
	rm -rvf *.exe *~ *.out *.dSYM *.stackdump *.o *_conv.csv