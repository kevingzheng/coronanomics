#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iterator>

using namespace std;
// ./csvconvert.exe file_to_format.csv [num_rows_to_discard]
int main(int argc, char** argv) {
    // Speed up I/O by de-syncing from C stdio
    ios_base::sync_with_stdio(false);

    // Check cmd args
    if(argc < 2 || argc > 3) {
        std::cout << "Error: please enter a filename to convert." << endl;
        exit(1);
    }
    int discardRows = 11;

    if(argc == 3) {
        discardRows = stoi(argv[2]);
    }

    string filename(argv[1]);
    ifstream input(filename);

    string filepred = filename.substr(0, filename.length() - 4);
    ofstream output(filepred + "_conv.csv");

    // Remove the first 'discardRows' lines
    string _garbage;
    for(int i  = 1; i <= discardRows; i++) {
        getline(input, _garbage);
    }

    output << "date,value\n";

    bool doublecommas = false;

    // Throw away year line
    getline(input, _garbage);
    istream_iterator<char> eos;
    istream_iterator<char> itr(input);
    while(itr != eos && !doublecommas) {
        bool first = true;
        //++itr;
        // Get the year
        string year = "0000-";
        for(int i = 0; i < 4; i++) {
            year[i] = *itr;
            ++itr;
        } // end for i
        // Loop over months
        for(int i = 1; i <= 12; i++) {
            // Read comma and discard
            if(first) {
                first = false;
                //++itr;
            } 
            // Break if another comma
            if(input.peek() == ',') {
                doublecommas = true;
                break;
            }
            // ADD YEAR
            output << year;
            string month = "";
            if(i < 10) {
                month += "0";
            } // end if
            month += to_string(i);
            month += "-";
            // ADD MONTH
            output << month;
            // ADD DAY
            output << "01";
            // ADD COMMA
            output << ",";
            float value;
            input >> value;
            ++itr;
            string next = to_string(value);
            output << next;
            output << "\n";
        } // end for i
    } // end while reading stream
    input.close();
    std::cout << "Read file" << endl;
    return 0;
}