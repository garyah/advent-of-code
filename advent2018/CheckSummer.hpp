#include <unordered_map>
//#include <unordered_set>
#include <stdint.h>
//#include <vector>

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
        }

        //int64_t method2()
        //{
        //    return m_checksum;
        //}

        unsigned getChecksum() { return m_exactTwoCount * m_exactThreeCount; }

    private:
        //typedef std::vector<int64_t> SomeVectorType;
        //typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<char, unsigned> LetterStats;

        unsigned m_exactTwoCount;
        unsigned m_exactThreeCount;
        //SomeVectorType m_someVector;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
