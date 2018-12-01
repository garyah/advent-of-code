#include <stdint.h>

namespace Advent2018
{
    class FrequencyCalibrator
    {
    public:
        FrequencyCalibrator() :
            m_frequency(0)
        {
        }

        void changeFrequency(const char *input)
        {
            int64_t frequencyChange = 0;
            (void)sscanf_s(input, "%lld", &frequencyChange);
            m_frequency += frequencyChange;
        }

        int64_t getFrequency() { return m_frequency; }

    private:
        int64_t m_frequency;
    };
}
