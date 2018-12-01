#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/FrequencyCalibrator.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    FrequencyCalibrator calibrator;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        calibrator.changeFrequency(line);
    }
    (void)printf("%lld\n", calibrator.getFrequency());
    return 0;
}
