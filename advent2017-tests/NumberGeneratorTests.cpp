#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/NumberGenerator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(NumberGeneratorTests)
    {
    public:
        TEST_METHOD(Initial65GeneratesCorrectFirst5)
        {
            NumberGenerator generator(65u, 16807u);
            Assert::AreEqual(1092455u, generator.getNextNumber());
            Assert::AreEqual(1181022009u, generator.getNextNumber());
            Assert::AreEqual(245556042u, generator.getNextNumber());
            Assert::AreEqual(1744312007u, generator.getNextNumber());
            Assert::AreEqual(1352636452u, generator.getNextNumber());
        }

        TEST_METHOD(Initial8921GeneratesCorrectFirst5)
        {
            NumberGenerator generator(8921u, 48271u);
            Assert::AreEqual(430625591u, generator.getNextNumber());
            Assert::AreEqual(1233683848u, generator.getNextNumber());
            Assert::AreEqual(1431495498u, generator.getNextNumber());
            Assert::AreEqual(137874439u, generator.getNextNumber());
            Assert::AreEqual(285222916u, generator.getNextNumber());
        }

        TEST_METHOD(Initial65GeneratesCorrectFirst5DivisibleBy4)
        {
            NumberGenerator generator(65u, 16807u, 4u);
            Assert::AreEqual(1352636452u, generator.getNextNumber());
            Assert::AreEqual(1992081072u, generator.getNextNumber());
            Assert::AreEqual(530830436u, generator.getNextNumber());
            Assert::AreEqual(1980017072u, generator.getNextNumber());
            Assert::AreEqual(740335192u, generator.getNextNumber());
        }

        TEST_METHOD(Initial8921GeneratesCorrectFirst5DivisibleBy8)
        {
            NumberGenerator generator(8921u, 48271u, 8u);
            Assert::AreEqual(1233683848u, generator.getNextNumber());
            Assert::AreEqual(862516352u, generator.getNextNumber());
            Assert::AreEqual(1159784568u, generator.getNextNumber());
            Assert::AreEqual(1616057672u, generator.getNextNumber());
            Assert::AreEqual(412269392u, generator.getNextNumber());
        }
    };
}
