#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/ErrorCorrector.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    ErrorCorrector corrector;
    char *line = NULL;
	while ((line = InputReader::ReadLine()) != NULL)
	{
        corrector.addMessage(line);
    }
    corrector.doReverseCorrection();
    (void)printf("%s\n", corrector.getCorrected());
    return 0;
}
