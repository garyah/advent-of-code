#include <iostream>

#include "../advent2018/TreeBuilder.hpp"

using namespace Advent2018;

int main()
{
    TreeBuilder builder;
	builder.readData();
	builder.processSumOfMetadata();
	std::cout << builder.getSumOfMetadata();
	return 0;
}
