#include <iostream>

#include "../advent2018/TreeBuilder.hpp"

//using namespace Common;
using namespace Advent2018;

int main()
{
	TreeBuilder builder;
	builder.readData();
	std::cout << builder.method2();
	return 0;
}
