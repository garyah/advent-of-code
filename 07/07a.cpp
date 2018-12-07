#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/StepSorter.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    StepSorter optimizer;
    char *line = NULL;
	while ((line = InputReader::ReadLine()) != NULL)
	{
        optimizer.method1(line);
	}
    (void)printf("%s\n", optimizer.method2());
    return 0;
}
