#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/ViableNodePairCounter.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    ViableNodePairCounter counter;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        counter.addNode(line);
    }
    counter.countViable();
    (void)printf("%u\n", counter.getNumViable());
    return 0;
}
