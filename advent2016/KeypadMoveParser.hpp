#include <stdio.h>
#include <algorithm>
#include <cmath>
#include <string>

namespace Advent2016
{
    class KeypadMoveParser
    {
    public:
        KeypadMoveParser() :
            m_x(0),
            m_y(0),
            m_code()
        {
        }

        void parseInstructionFor3x3(char *input)
        {
            for (char *p = input; *p; ++p)
            {
                if ('U' == *p) m_y = std::min(m_y + 1, 1);
                if ('D' == *p) m_y = std::max(m_y - 1, -1);
                if ('L' == *p) m_x = std::max(m_x - 1, -1);
                if ('R' == *p) m_x = std::min(m_x + 1, 1);
            }
            updateCodeFor3x3();
        }

        void parseInstructionForDiamond(char *input)
        {
            for (char *p = input; *p; ++p)
            {
                if ('U' == *p) m_y = std::min(m_y + 1, 2 - abs(m_x - 2));
                if ('D' == *p) m_y = std::max(m_y - 1, -2 + abs(m_x - 2));
                if ('L' == *p) m_x = std::max(m_x - 1, 0 + abs(m_y));
                if ('R' == *p) m_x = std::min(m_x + 1, 4 - abs(m_y));
            }
            updateCodeForDiamond();
        }

        const char *getCode()
        {
            return m_code.c_str();
        }

    private:
        void updateCodeFor3x3()
        {
            if (-1 == m_x)
            {
                if (1 == m_y) m_code.append("1");// += 1;
                if (0 == m_y) m_code.append("4");// += 4;
                if (-1 == m_y) m_code.append("7");// += 7;
            }
            if (0 == m_x)
            {
                if (1 == m_y) m_code.append("2");// += 2;
                if (0 == m_y) m_code.append("5");// += 5;
                if (-1 == m_y) m_code.append("8");// += 8;
            }
            if (1 == m_x)
            {
                if (1 == m_y) m_code.append("3");// += 3;
                if (0 == m_y) m_code.append("6");// += 6;
                if (-1 == m_y) m_code.append("9");// += 9;
            }
        }

        void updateCodeForDiamond()
        {
            if (0 == m_x)
            {
                if (0 == m_y) m_code.append("5");
            }
            if (1 == m_x)
            {
                if (1 == m_y) m_code.append("2");
                if (0 == m_y) m_code.append("6");
                if (-1 == m_y) m_code.append("A");
            }
            if (2 == m_x)
            {
                if (2 == m_y) m_code.append("1");
                if (1 == m_y) m_code.append("3");
                if (0 == m_y) m_code.append("7");
                if (-1 == m_y) m_code.append("B");
                if (-2 == m_y) m_code.append("D");
            }
            if (3 == m_x)
            {
                if (1 == m_y) m_code.append("4");
                if (0 == m_y) m_code.append("8");
                if (-1 == m_y) m_code.append("C");
            }
            if (4 == m_x)
            {
                if (0 == m_y) m_code.append("9");
            }
        }

    private:
        int m_x, m_y;
        std::string m_code;
    };
}
