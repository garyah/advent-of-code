#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/TreeBuilder.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    TreeBuilder builder;
    char *line = NULL;
	while ((line = InputReader::ReadLine()) != NULL)
	{
        builder.method1(line);
	}
    (void)printf("%u\n", builder.method2());
    return 0;
}
