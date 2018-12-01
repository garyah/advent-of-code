#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/BridgeBuilder.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(BridgeBuilderTests)
    {
    public:
        TEST_METHOD(SampleReturnsCorrectMaxStrength)
        {
            BridgeBuilder builder;
            builder.addComponent("0/2");
            builder.addComponent("2/2");
            builder.addComponent("2/3");
            builder.addComponent("3/4");
            builder.addComponent("3/5");
            builder.addComponent("0/1");
            builder.addComponent("10/1");
            builder.addComponent("9/10");
            builder.countBridges();
            Assert::AreEqual(31u, builder.getMaxStrength());
        }
    };
}
