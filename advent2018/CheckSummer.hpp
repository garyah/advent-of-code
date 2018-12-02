#include <algorithm>
#include <string.h>
#include <unordered_map>
#include <vector>

namespace Advent2018
{
    class CheckSummer
    {
    public:
        CheckSummer() :
            m_exactTwoCount(0),
            m_exactThreeCount(0)
        {
        }

        void addBoxId(const char *boxId)
        {
            LetterStats letterStats;
            for (char c = 'a'; c <= 'z'; ++c)
            {
                letterStats[c] = 0;
            }
            for (const char *p = boxId; *p != 0; ++p)
            {
                letterStats[*p] += 1;
            }
            bool gotExactlyTwo = false, gotExactlyThree = false;
            for (char c = 'a'; c <= 'z'; ++c)
            {
                if (letterStats[c] == 2) gotExactlyTwo = true;
                if (letterStats[c] == 3) gotExactlyThree = true;
                if (gotExactlyTwo && gotExactlyThree) break;
            }
            if (gotExactlyTwo) ++m_exactTwoCount;
            if (gotExactlyThree) ++m_exactThreeCount;
            m_boxIds.push_back(boxId);
        }

        void findPrototypeBoxes()
        {
            std::sort(m_boxIds.begin(), m_boxIds.end());
            auto it1 = m_boxIds.cbegin();
            for (auto it2 = it1 + 1; it2 != m_boxIds.cend(); ++it1, ++it2)
            {
                unsigned numMismatches = 0;
                std::string matchingSubString;
                for (size_t i = 0; i < it1->length(); ++i)
                {
                    if ((*it1)[i] != (*it2)[i]) ++numMismatches;
                    else matchingSubString += (*it1)[i];
                }
                if (numMismatches == 1) m_matchingSubString = matchingSubString;
            }
        }

        unsigned getChecksum() { return m_exactTwoCount * m_exactThreeCount; }
        std::string getMatchingSubString() { return m_matchingSubString; }

    private:
        typedef std::unordered_map<char, unsigned> LetterStats;
        typedef std::vector<std::string> BoxIds;

        unsigned m_exactTwoCount;
        unsigned m_exactThreeCount;

        BoxIds m_boxIds;
        std::string m_matchingSubString;
    };
}
