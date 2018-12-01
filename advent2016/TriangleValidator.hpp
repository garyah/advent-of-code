#include <stdio.h>

#define _countof(a) (sizeof(a)/sizeof(*(a)))

namespace Advent2016
{
    class TriangleValidator
    {
    public:
        TriangleValidator() :
            m_numValidByRows(0),
            m_lastRowIndex(0),
            m_numValidByColumns(0)
        {
            ;
            for (size_t r = 0; r < _countof(m_lastThreeRows); ++r)
            {
                for (size_t c = 0; c < _countof(m_lastThreeRows[r]); ++c)
                {
                    m_lastThreeRows[r][c] = 0;
                }
            }
        }

        void addRow(char *input)
        {
            int side1 = -1, side2 = -1, side3 = -1;
            (void)sscanf(input, "%d %d %d", &side1, &side2, &side3);
            if (side1 >= 0 && side2 >= 0 && side3 >= 0)
            {
                auto s1 = static_cast<unsigned>(side1);
                auto s2 = static_cast<unsigned>(side2);
                auto s3 = static_cast<unsigned>(side3);
                if (isValidTriangle(s1, s2, s3)) { ++m_numValidByRows; }
                m_lastThreeRows[m_lastRowIndex][0] = s1;
                m_lastThreeRows[m_lastRowIndex][1] = s2;
                m_lastThreeRows[m_lastRowIndex][2] = s3;
                m_lastRowIndex = (m_lastRowIndex + 1) % 3;
                if (0 == m_lastRowIndex)
                {
                    // have three rows saved, now time to check by columns
                    for (size_t c = 0; c < _countof(m_lastThreeRows[0]); ++c)
                    {
                        if (isValidTriangle(
                            m_lastThreeRows[0][c],
                            m_lastThreeRows[1][c],
                            m_lastThreeRows[2][c])) { ++m_numValidByColumns; }
                    }
                }
            }
        }

        unsigned getNumValidByRows()
        {
            return m_numValidByRows;
        }

        unsigned getNumValidByColumns()
        {
            return m_numValidByColumns;
        }

    private:
        bool isValidTriangle(unsigned side1, unsigned side2, unsigned side3)
        {
            if (side1 + side2 > side3
                && side1 + side3 > side2
                && side2 + side3 > side1)
            {
                return true;
            }
            return false;
        }

    private:
        unsigned m_numValidByRows;
        unsigned m_lastThreeRows[3][3];
        unsigned m_lastRowIndex;
        unsigned m_numValidByColumns;
    };
}
