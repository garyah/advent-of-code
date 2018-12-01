#include <string.h>
#include <string>
#include <map>
#include <vector>

namespace Advent2016
{
    class ErrorCorrector
    {
        typedef std::map<char, unsigned> CountMap;
        typedef std::vector<CountMap> CountMaps;

        typedef std::map<unsigned, char> LetterMap;

    public:
        ErrorCorrector() :
            m_countMaps(),
            m_corrected()
        {
        }

        void addMessage(const char *message)
        {
            auto p = message;
            for (size_t i = 0; *p; ++p, ++i)
            {
                if (i == m_countMaps.size()) { m_countMaps.push_back(CountMap()); }
                auto& countMap = m_countMaps[i];
                if (islower(*p)) { countMap[*p]++; }
            }
        }

        void doForwardCorrection()
        {
            for (const auto& countMap : m_countMaps)
            {
                LetterMap letterMap;
                for (const auto& pair : countMap)
                {
                    letterMap[pair.second] = pair.first;
                }
                m_corrected.append(1, letterMap.rbegin()->second);
            }
        }

        void doReverseCorrection()
        {
            for (const auto& countMap : m_countMaps)
            {
                LetterMap letterMap;
                for (const auto& pair : countMap)
                {
                    letterMap[pair.second] = pair.first;
                }
                m_corrected.append(1, letterMap.begin()->second);
            }
        }

        const char *getCorrected()
        {
            return m_corrected.c_str();
        }

    private:
        CountMaps m_countMaps;
        std::string m_corrected;
    };
}
