#include <unordered_set>
#include <stdint.h>
#include <vector>

namespace Advent2018
{
    class FrequencyCalibrator
    {
    public:
        FrequencyCalibrator(bool extendedOperation = false) :
            m_frequency(0),
            m_extendedOperation(extendedOperation),
            m_frequencyIsRepeated(false),
            m_repeatedFrequency(-1)
        {
        }

        void changeFrequency(const char *input)
        {
            int64_t frequencyChange = 0;
            (void)sscanf_s(input, "%lld", &frequencyChange);
            m_frequency += frequencyChange;

            if (m_extendedOperation && !m_frequencyIsRepeated)
            {
                if (m_seenFrequencies.count(m_frequency))
                {
                    m_frequencyIsRepeated = true;
                    m_repeatedFrequency = m_frequency;
                    return;
                }
                m_frequencyChanges.push_back(frequencyChange);
                m_seenFrequencies.insert(m_frequency);
            }
        }

        int64_t firstRepeatedFrequency()
        {
            if (!m_extendedOperation || m_frequencyIsRepeated) return m_repeatedFrequency;

            while (!m_frequencyIsRepeated)
            {
                (void)printf("spinning frequency change list\n");
                for (FrequencyChanges::const_iterator it = m_frequencyChanges.cbegin();
                     it != m_frequencyChanges.cend();
                     ++it)
                {
                    m_frequency += *it;
                    if (m_seenFrequencies.count(m_frequency))
                    {
                        m_frequencyIsRepeated = true;
                        m_repeatedFrequency = m_frequency;
                        break;
                    }
                    m_seenFrequencies.insert(m_frequency);
                }
            }
            return m_repeatedFrequency;
        }

        int64_t getFrequency() { return m_frequency; }

    private:
        typedef std::vector<int64_t> FrequencyChanges;
        typedef std::unordered_set<int64_t> SeenFrequencies;

        int64_t m_frequency;
        bool m_extendedOperation;
        FrequencyChanges m_frequencyChanges;
        SeenFrequencies m_seenFrequencies;
        bool m_frequencyIsRepeated;
        int64_t m_repeatedFrequency;
    };
}
