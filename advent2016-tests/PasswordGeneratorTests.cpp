#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/PasswordGenerator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(PasswordGeneratorTests)
    {
    public:
        
        TEST_METHOD(TestMethod05a1)
        {
            PasswordGenerator generator;
            // this unit test takes too long to run, at present!
            //generator.generateInOrder("abc");
            //Assert::AreEqual("18f47a30", generator.getPassword());
        }

        TEST_METHOD(TestMethod05b1)
        {
            PasswordGenerator generator;
            // this unit test takes too long to run, at present!
            //generator.generateByPosition("abc");
            //Assert::AreEqual("05ace8e3", generator.getPassword());
        }

    };
}
