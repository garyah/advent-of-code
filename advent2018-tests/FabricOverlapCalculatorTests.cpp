#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2018/FabricOverlapCalculator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2018;

namespace advent2018tests
{
    TEST_CLASS(FabricOverlapCalculatorTests)
    {
    public:
        TEST_METHOD(BlankTest)
        {
            FabricOverlapCalculator blank;
            blank.method1("0");
            Assert::AreEqual(0, (int)blank.method2());
        }
    };
}
