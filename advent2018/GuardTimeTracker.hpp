#include <algorithm>
#include <string.h>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace Advent2018
{
    class GuardTimeTracker
    {
    public:
        GuardTimeTracker()
        {
        }

        void addRecord(const char *record)
        {
            m_recordStore.push_back(record);
        }

        void sortAndProcessRecords()
        {
            std::sort(m_recordStore.begin(), m_recordStore.end());
            unsigned year = 0, month = 0, date = 0, hour = 0, minute = 0, fallsAsleepMinute = 0, wakesUpMinute = 0, id = 0;
            for (auto it = m_recordStore.cbegin(); it != m_recordStore.cend(); ++it)
            {
                std::string record(*it);
                if (record.find("Guard") != std::string::npos)
                {
                    (void)sscanf_s(it->c_str(), "[%4u-%2u-%2u %2u:%2u] Guard #%u begins shift", &year, &month, &date, &hour, &minute, &id);
                    if (m_guardSleepTimes.find(id) == m_guardSleepTimes.end())
                    {
                        m_guardSleepTimes[id] = 0;
                        SleepMinuteList sleepMinutesList;
                        for (size_t i = 0; i < 60; ++i) { sleepMinutesList.push_back(0); }
                        m_guardSleepMinutes[id] = sleepMinutesList;
                    }
                }
                else if (record.find("falls") != std::string::npos)
                {
                    (void)sscanf_s(it->c_str(), "[%4u-%2u-%2u %2u:%2u] falls asleep", &year, &month, &date, &hour, &fallsAsleepMinute);
                }
                else if (record.find("wakes") != std::string::npos)
                {
                    (void)sscanf_s(it->c_str(), "[%4u-%2u-%2u %2u:%2u] wakes up", &year, &month, &date, &hour, &wakesUpMinute);
                    m_guardSleepTimes[id] += wakesUpMinute - fallsAsleepMinute;
                    for (size_t i = fallsAsleepMinute; i < wakesUpMinute; ++i) { m_guardSleepMinutes[id][i] += 1; }
                }
            }
        }

        unsigned getIdOfSleepiestGuardTimesItsSleepiestMinute()
        {
            unsigned iDOfSleepiestGuard = 0;
            unsigned maxSleepTime = 0;
            for (auto it = m_guardSleepTimes.cbegin(); it != m_guardSleepTimes.cend(); ++it)
            {
                auto guardSleepTime = it->second;
                if (guardSleepTime > maxSleepTime)
                {
                    maxSleepTime = guardSleepTime;
                    iDOfSleepiestGuard = it->first;
                }
            }

            size_t sleepiestMinute = 0;
            unsigned maxNumberSleeps = 0;
            for (size_t i = 0; i < m_guardSleepMinutes[iDOfSleepiestGuard].size(); ++i)
            {
                auto numberSleeps = m_guardSleepMinutes[iDOfSleepiestGuard][i];
                if (numberSleeps > maxNumberSleeps)
                {
                    maxNumberSleeps = numberSleeps;
                    sleepiestMinute = i;
                }
            }
            return iDOfSleepiestGuard * sleepiestMinute;
        }

        unsigned getIdOfGuardWithSleepiestMinuteTimesItsSleepiestMinute()
        {
            unsigned iDOfGuardWithSleepiestMinute = 0;
            size_t sleepiestMinute = 0;
            unsigned maxNumberSleeps = 0;
            for (auto it = m_guardSleepTimes.cbegin(); it != m_guardSleepTimes.cend(); ++it)
            {
                auto id = it->first;
                for (size_t i = 0; i < m_guardSleepMinutes[id].size(); ++i)
                {
                    auto numberSleeps = m_guardSleepMinutes[id][i];
                    if (numberSleeps > maxNumberSleeps)
                    {
                        maxNumberSleeps = numberSleeps;
                        sleepiestMinute = i;
                        iDOfGuardWithSleepiestMinute = id;
                    }
                }
            }
            return iDOfGuardWithSleepiestMinute * sleepiestMinute;
        }

    private:
        typedef std::vector<std::string> RecordStore;
        typedef std::unordered_map<unsigned, unsigned> GuardSleepTimes;
        typedef std::vector<unsigned> SleepMinuteList;
        typedef std::unordered_map<unsigned, SleepMinuteList> GuardSleepMinutes;

        RecordStore m_recordStore;
        GuardSleepTimes m_guardSleepTimes;
        GuardSleepMinutes m_guardSleepMinutes;
    };
}
