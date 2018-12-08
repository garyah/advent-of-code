#include <iostream>

#include "../advent2018/TreeBuilder.hpp"

//using namespace Common;
using namespace Advent2018;

int main()
{
    TreeBuilder builder;
	builder.readData();
	builder.processMetadata();
	std::cout << builder.getSumOfMetadata();
	return 0;
}
