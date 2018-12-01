#include <string>

namespace Advent2016
{
    class SafeTileCounter
    {
    public:
        SafeTileCounter() :
            m_numberSafeTiles(0)
        {
        }

        void countTiles(const char *firstRow, unsigned numberRows)
        {
            std::string row(firstRow);
            m_numberSafeTiles = rowSafeTileCount(row);
            for (unsigned i = 1; i < numberRows; ++i)
            {
                row = makeNextRow(row);
                m_numberSafeTiles += rowSafeTileCount(row);
            }
        }

        unsigned getNumberSafeTiles() const
        {
            return m_numberSafeTiles;
        }

    private:
        unsigned rowSafeTileCount(const std::string& row)
        {
            unsigned count = 0;
            for (const char *p = row.c_str(); *p; ++p)
            {
                if ('.' == *p) { ++count; }
            }
            return count;
        }

        std::string makeNextRow(const std::string& row)
        {
            std::string thisRow(".");
            thisRow.append(row);
            thisRow.append(".");
            std::string nextRow(thisRow.length(), ' ');
            for (size_t i = 1; i <= row.length(); ++i)
            {
                if (thisRow.substr(i - 1, 3).compare("^..") == 0
                    || thisRow.substr(i - 1, 3).compare("^^.") == 0
                    || thisRow.substr(i - 1, 3).compare(".^^") == 0
                    || thisRow.substr(i - 1, 3).compare("..^") == 0)
                {
                    nextRow[i] = '^';
                    continue;
                }
                nextRow[i] = '.';
            }
            return nextRow.substr(1, row.length());
        }

    private:
        unsigned m_numberSafeTiles;
    };
}
