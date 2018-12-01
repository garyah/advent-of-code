#define xDEBUG_TEST

#include <stdio.h>
#include <map>

namespace Advent2016
{
    class GoodIPFinder
    {
        typedef std::map<unsigned, unsigned> RangeMap;

    public:
        GoodIPFinder() :
            m_blacklistMap(),
            m_firstGoodIP(0),
            m_goodIPCount(0)
        {
        }

        void addBlacklistRule(const char *rule)
        {
            unsigned start = 0, end = 0;
            (void)sscanf(rule, "%u-%u", &start, &end);
            m_blacklistMap[start] = end;
        }

        void findFirstGoodIP()
        {
#ifdef DEBUG_TEST
            for (auto range : m_blacklistMap)
            {
                (void)printf("%u-%u\n", range.first, range.second);
            }
#endif // DEBUG_TEST

            m_firstGoodIP = 0;
            auto rangeIter = m_blacklistMap.begin();
            if (rangeIter->first)
            {
                // gap at start includes first good
                return;
            }
            auto maxEnd = rangeIter->second;
            for (++rangeIter; maxEnd < UINT32_MAX && rangeIter != m_blacklistMap.end(); ++rangeIter)
            {
                if (rangeIter->first > maxEnd + 1)
                {
                    // gap in middle includes first good
                    m_firstGoodIP = maxEnd + 1;
                    return;
                }
                if (rangeIter->second > maxEnd) { maxEnd = rangeIter->second; }
            }
            if (maxEnd >= UINT32_MAX)
            {
                // no gaps -- shouldn't happen, but it could!
                return;
            }
            // gap at end includes first good
            m_firstGoodIP = maxEnd + 1;
        }

        void findGoodIPCount()
        {
            m_goodIPCount = 0;
            auto rangeIter = m_blacklistMap.begin();
            if (rangeIter->first)
            {
                // gap at start
                m_goodIPCount += rangeIter->first;
            }
            auto maxEnd = rangeIter->second;
            for (++rangeIter; maxEnd < UINT32_MAX && rangeIter != m_blacklistMap.end(); ++rangeIter)
            {
                if (rangeIter->first > maxEnd + 1)
                {
                    // gap in middle
                    m_goodIPCount += rangeIter->first - maxEnd - 1;
                }
                if (rangeIter->second > maxEnd) { maxEnd = rangeIter->second; }
            }
            if (maxEnd >= UINT32_MAX)
            {
                // no gaps -- shouldn't happen, but it could!
                return;
            }
            // gap at end
            m_goodIPCount += UINT32_MAX - maxEnd;
        }

        unsigned getFirstGoodIP()
        {
            return m_firstGoodIP;
        }

        unsigned getGoodIPCount()
        {
            return m_goodIPCount;
        }

    private:
        RangeMap m_blacklistMap;
        unsigned m_firstGoodIP;
        unsigned m_goodIPCount;
    };
}
