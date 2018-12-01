#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2017/BridgeBuilder.hpp"

using namespace Common;
using namespace Advent2017;

int main()
{
    BridgeBuilder builder;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
         builder.addComponent(line);
    }
     builder.countBridges();
     (void)printf("%u\n", builder.getMaxStrength());
    return 0;
}
