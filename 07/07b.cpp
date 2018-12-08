#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/StepSorter.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
	StepSorter sorter;
	char *line = NULL;
	while ((line = InputReader::ReadLine()) != NULL)
	{
		sorter.addStepDependency(line);
	}
	(void)printf("%u\n", sorter.getParallelTimeSpent());
	return 0;
}
