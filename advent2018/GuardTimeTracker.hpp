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

        unsigned getIdOfSleepiestGuardBySleepiestMinute()
        {
            std::sort(m_recordStore.begin(), m_recordStore.end());
            GuardSleepTimes guardSleepTimes;
            GuardSleepMinutes guardSleepMinutes;
            unsigned year = 0, month = 0, date = 0, hour = 0, minute = 0, fallsAsleepMinute = 0, wakesUpMinute = 0, id = 0;
            for (auto it = m_recordStore.cbegin(); it != m_recordStore.cend(); ++it)
            {
                std::string record(*it);
                if (record.find("Guard") != std::string::npos)
                {
                    (void)sscanf_s(it->c_str(), "[%4u-%2u-%2u %2u:%2u] Guard #%u begins shift", &year, &month, &date, &hour, &minute, &id);
                    if (guardSleepTimes.find(id) == guardSleepTimes.end())
                    {
                        guardSleepTimes[id] = 0;
                        SleepMinuteList sleepMinutesList;
                        for (size_t i = 0; i < 60; ++i) { sleepMinutesList.push_back(0); }
                        guardSleepMinutes[id] = sleepMinutesList;
                    }
                }
                else if (record.find("falls") != std::string::npos)
                {
                    (void)sscanf_s(it->c_str(), "[%4u-%2u-%2u %2u:%2u] falls asleep", &year, &month, &date, &hour, &fallsAsleepMinute);
                }
                else if (record.find("wakes") != std::string::npos)
                {
                    (void)sscanf_s(it->c_str(), "[%4u-%2u-%2u %2u:%2u] wakes up", &year, &month, &date, &hour, &wakesUpMinute);
                    guardSleepTimes[id] += wakesUpMinute - fallsAsleepMinute;
                    for (size_t i = fallsAsleepMinute; i < wakesUpMinute; ++i) { guardSleepMinutes[id][i] += 1; }
                }
            }

            unsigned maxSleepTime = 0;
            unsigned iDOfSleepiestGuard = 0;
            for (auto it = guardSleepTimes.cbegin(); it != guardSleepTimes.cend(); ++it)
            {
                auto guardSleepTime = it->second;
                if (guardSleepTime > maxSleepTime)
                {
                    maxSleepTime = guardSleepTime;
                    iDOfSleepiestGuard = it->first;
                }
            }

            unsigned maxNumberSleeps = 0;
            unsigned sleepiestMinute = 0;
            for (size_t i = 0; i < guardSleepMinutes[iDOfSleepiestGuard].size(); ++i)
            {
                auto numberSleeps = guardSleepMinutes[iDOfSleepiestGuard][i];
                if (numberSleeps > maxNumberSleeps)
                {
                    maxNumberSleeps = numberSleeps;
                    sleepiestMinute = i;
                }
            }
            return iDOfSleepiestGuard * sleepiestMinute;
        }

    private:
        typedef std::vector<std::string> RecordStore;
        typedef std::unordered_map<unsigned, unsigned> GuardSleepTimes;
        typedef std::vector<unsigned> SleepMinuteList;
        typedef std::unordered_map<unsigned, SleepMinuteList> GuardSleepMinutes;

        RecordStore m_recordStore;
    };
}
