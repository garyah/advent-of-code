#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/FrequencyCalibrator.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    FrequencyCalibrator calibrator(true);
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        calibrator.changeFrequency(line);
    }
    (void)printf("%lld\n", calibrator.firstRepeatedFrequency());
    return 0;
}
